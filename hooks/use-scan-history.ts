import { useState, useCallback, useEffect } from 'react';
import { 
  ScanHistoryResponse, 
  ScanHistoryItem 
} from '@/lib/api/scan-history';
import { 
  fetchScanHistory, 
  fetchFilteredScanHistory 
} from '@/lib/server-actions/scans';

// Backend API URL (same as in scan-history.ts)
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to decode URL-encoded business names
function decodeBusinessName(name: string | undefined): string {
  if (!name) return '';
  
  if (!name.includes('%')) return name;
  
  try {
    return decodeURIComponent(name);
  } catch (error) {
    console.error('Error decoding business name:', error);
    return name;
  }
}

interface UseScanHistoryOptions {
  initialKeyword?: string;
  initialStatus?: 'all' | 'completed' | 'in-progress' | 'repeated' | 'failed';
  initialSortBy?: string;
}

export function useScanHistory(options: UseScanHistoryOptions = {}) {
  const [filterParams, setFilterParams] = useState({
    keyword: options.initialKeyword || '',
    status: options.initialStatus || 'all',
    sortBy: options.initialSortBy || 'date'
  });
  
  const [data, setData] = useState<ScanHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch scan history
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    console.log('🔄 Fetching scan history with params:', filterParams);
    
    try {
      const result = filterParams.keyword || filterParams.status !== 'all' || filterParams.sortBy !== 'date'
        ? await fetchFilteredScanHistory(filterParams)
        : await fetchScanHistory();
      
      console.log('✅ Scan history response:', result);
      setData(result);
    } catch (err) {
      console.error('Error fetching scan history:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch scan history'));
    } finally {
      setIsLoading(false);
    }
  }, [filterParams]);

  // Fetch data when component mounts or filter params change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update filter parameters
  const updateFilters = useCallback((newParams: Partial<typeof filterParams>) => {
    setFilterParams(prev => ({ ...prev, ...newParams }));
  }, []);

  // Group scans by business
  const scansByBusiness = useCallback(() => {
    if (!data?.scanHistory) return {};
    
    const grouped: { [key: string]: ScanHistoryItem[] } = {};
    data.scanHistory.forEach(scan => {
      const businessKey = decodeBusinessName(scan.business_location?.name) || scan.url;
      if (!grouped[businessKey]) {
        grouped[businessKey] = [];
      }
      grouped[businessKey].push(scan);
    });
    
    return grouped;
  }, [data]);

  return {
    scanHistory: data?.scanHistory || [],
    scansByBusiness: scansByBusiness(),
    isLoading,
    error,
    filters: filterParams,
    updateFilters,
    refetch: fetchData
  };
}    