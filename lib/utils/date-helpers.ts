/**
 * Utility functions for formatting dates and times
 */

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "March 13, 2025")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  
  try {
    // Parse the date string and ensure it's treated as UTC if it's in ISO format
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use user's timezone consistently
    });
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return 'N/A';
  }
}

/**
 * Format a date string to a readable time format
 * @param dateString - ISO date string
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatTime(dateString: string): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid Time';
    }
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use user's timezone consistently
    });
  } catch (error) {
    console.error('Error formatting time:', error, dateString);
    return 'N/A';
  }
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, 4th, etc.)
 * @param num - The number to get the ordinal suffix for
 * @returns The ordinal suffix (st, nd, rd, th)
 */
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

/**
 * Format a date string to a human-readable format with ordinal day
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "4th June 2025")
 */
export function formatHumanDate(dateString: string): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid Date';
    }
    
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: userTimezone
    });
    
    const parts = formatter.formatToParts(date);
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '0');
    const month = parts.find(p => p.type === 'month')?.value || '';
    const year = parts.find(p => p.type === 'year')?.value || '';
    
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  } catch (error) {
    console.error('Error formatting human date:', error, dateString);
    return 'N/A';
  }
}

/**
 * Format a date for consistent display across the app
 * This ensures all dates are displayed in the same format and timezone
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "June 13, 2025 at 2:30 PM")
 */
export function formatDateTime(dateString: string): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid Date';
    }
    
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Format date and time together for consistency
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimezone
    });
  } catch (error) {
    console.error('Error formatting datetime:', error, dateString);
    return 'N/A';
  }
} 