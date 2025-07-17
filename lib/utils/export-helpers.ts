import axios from '@/lib/axios';
import { saveAs } from 'file-saver';

type ToastFunction = {
  (props: { 
    title: string; 
    description: string; 
    variant?: "default" | "destructive" 
  }): void;
};

interface ExportOptions {
  excludeEmails?: string[];
  filterGenericEmails?: boolean;
}

/**
 * Utility function to create CSV content from data with proper escaping
 * @param headers Array of column headers
 * @param rows Array of data rows (each row is an array of values)
 * @returns Properly formatted CSV string
 */
export const createCSVContent = (headers: string[], rows: (string | number | null | undefined)[][]): string => {
  const data = [headers, ...rows];
  
  return data.map((row) =>
    row.map((cell) => {
      // Ensure cell is a string and handle null/undefined
      const cellStr = cell === null || cell === undefined ? '' : String(cell);
      
      // Handle fields that need escaping (contains comma, quote, or newline)
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n') || cellStr.includes('\r')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      
      return cellStr;
    }).join(',')
  ).join('\n');
};

/**
 * Utility function to download CSV content using FileSaver
 * @param csvContent The CSV content string
 * @param filename The filename for the download
 * @param toast Toast function for notifications
 */
export const downloadCSV = (csvContent: string, filename: string, toast?: ToastFunction): void => {
  try {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
    
    if (toast) {
      toast({
        title: "Export Successful",
        description: "Data exported to CSV successfully!",
      });
    }
  } catch (error) {
    console.error('Error downloading CSV:', error);
    if (toast) {
      toast({
        title: "Export Failed",
        description: "Failed to download CSV. Please try again.",
        variant: "destructive",
      });
    }
  }
};

/**
 * Utility function to export data as CSV
 * @param endpoint API endpoint to fetch CSV data from
 * @param filename Name of the downloaded file
 * @param toast Toast function for notifications
 * @param setLoading Optional state setter for loading indicator
 * @returns Promise that resolves when export is complete
 */
export const exportCsv = async (
  endpoint: string,
  filename: string,
  toast: ToastFunction,
  setLoading?: (loading: boolean) => void
): Promise<void> => {
  try {
    if (setLoading) setLoading(true);
    
    const response = await axios.get(endpoint, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Export Successful",
      description: "Data exported to CSV",
    });
  } catch (error) {
    console.error("Failed to export data:", error);
    toast({
      title: "Export Failed",
      description: "Failed to export data. Please try again.",
      variant: "destructive",
    });
  } finally {
    if (setLoading) setLoading(false);
  }
};

/**
 * Standardized function to export lead search results to CSV
 * @param searchId The ID of the search to export
 * @param searchQuery The human-readable query for filename
 * @param getSearchResults Function to fetch search results
 * @param toast Toast function for notifications
 * @param setExporting Optional state setter for loading indicator
 * @param options Export options including email filtering
 * @returns Promise that resolves when export is complete
 */
export const exportLeadSearchResults = async (
  searchId: string,
  searchQuery: string,
  getSearchResults: (searchId: string, page: number, limit: number) => Promise<any>,
  toast: ToastFunction,
  setExporting?: (exporting: boolean) => void,
  options?: ExportOptions
): Promise<void> => {
  try {
    if (setExporting) setExporting(true);
    
    // Get all results for this search
    const allResults = await getSearchResults(searchId, 1, 10000);
    
    if (!allResults.results || allResults.results.length === 0) {
      toast({
        title: "Export Failed",
        description: "No results to export",
        variant: "destructive"
      });
      return;
    }

    // Generic email patterns to exclude
    const genericEmailPatterns = [
      /^info@/i,
      /^contact@/i,
      /^support@/i,
      /^admin@/i,
      /^sales@/i,
      /^hello@/i,
      /^help@/i,
      /^service@/i,
      /^customer@/i,
      /^office@/i,
      /^general@/i,
      /^enquiry@/i,
      /^inquiry@/i,
      /^reception@/i,
      /^orders@/i,
      /^booking@/i,
      /^reservations@/i,
      /^delivery@/i,
      /^delivery_help@/i,
      /^notifications@/i,
      /^noreply@/i,
      /^no-reply@/i,
      /^donotreply@/i,
      /^webmaster@/i,
      /^marketing@/i,
      /^newsletter@/i,
      /^subscribe@/i,
      /^unsubscribe@/i,
      /^feedback@/i,
      /^careers@/i,
      /^jobs@/i,
      /^hr@/i,
      /^billing@/i,
      /^accounts@/i,
      /^finance@/i,
      /^legal@/i,
      /^privacy@/i,
      /^security@/i,
      /^abuse@/i,
      /^team@/i,
      /@example\./i,
      /@test\./i,
      /@localhost/i,
      /@.*\.test$/i,
      /@.*\.example$/i,
    ];

    // Function to check if email is generic
    const isGenericEmail = (email: string): boolean => {
      if (!email || typeof email !== 'string') return false;
      const lowerEmail = email.toLowerCase().trim();
      return genericEmailPatterns.some(pattern => pattern.test(lowerEmail));
    };

    // Combine custom exclude emails with generic filtering
    const customExcludeEmails = options?.excludeEmails || [];

    // Filter results based on email exclusions
    let filteredResults = allResults.results;
    let excludedCount = 0;
    
    if (options?.filterGenericEmails || customExcludeEmails.length > 0) {
      filteredResults = allResults.results.filter((result: any) => {
        const email = result.email?.toLowerCase()?.trim() || '';
        if (!email) return true; // Keep results without emails
        
        let shouldExclude = false;
        
        // Check against generic patterns if filtering is enabled
        if (options?.filterGenericEmails && isGenericEmail(email)) {
          shouldExclude = true;
        }
        
        // Check against custom exclude list
        if (!shouldExclude && customExcludeEmails.length > 0) {
          shouldExclude = customExcludeEmails.some(excludeEmail => 
            email === excludeEmail.toLowerCase().trim()
          );
        }
        
        if (shouldExclude) excludedCount++;
        return !shouldExclude;
      });
    }

    // Define headers without the unwanted columns (Full Name, Job Title, Business Name)
    const headers = [
      'Company',
      'Location',
      'Phone',
      'Email',
      'Website',
      'Description',
      'Address',
      'Category',
      'Rating',
      'Reviews Count'
    ];

    // Map results to CSV data without the unwanted columns
    const csvData = filteredResults.map((result: any) => [
      result.company || '',
      result.location || '',
      result.phone || '',
      result.email || '',
      result.url || result.website || '',
      result.description || '',
      result.address || '',
      result.category || '',
      result.rating || '',
      result.reviews_count || ''
    ]);

    csvData.unshift(headers);

    // Create CSV content using utility function
    const csvContent = createCSVContent(headers, csvData.slice(1)); // slice(1) to skip headers already in csvData
    
    // Download CSV using utility function
    const filename = `leads-${searchQuery.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
    
    // Override the default toast to include excluded count if applicable
    if (excludedCount > 0) {
      downloadCSV(csvContent, filename);
      toast({
        title: "Export Successful",
        description: `Lead search results exported successfully! (${excludedCount} ${excludedCount === 1 ? 'email' : 'emails'} excluded)`
      });
    } else {
      downloadCSV(csvContent, filename, toast);
    }
  } catch (error: any) {
    console.error('Error exporting lead search results:', error);
    toast({
      title: "Export Failed",
      description: "Failed to export search results. Please try again.",
      variant: "destructive",
    });
  } finally {
    if (setExporting) setExporting(false);
  }
};
