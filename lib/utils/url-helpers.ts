/**
 * Builds a URL for duplicating with the same settings as a previous scan
 */
export function buildDuplicateUrl(scan: {
  url: string;
  keywords: string[];
  pinCount: number;
  radius: number;
  scanType: string;
  frequency?: string | null;
  business_location?: {
    lat: number;
    lng: number;
    name: string;
    url?: string;
  };
}): string {
  // Create URL with query parameters
  const params = new URLSearchParams();
  
  // Add basic scan parameters
  // First try to use the scan.url which contains the Google Maps URL from the API
  // If not available, fall back to business_location.url
  const businessUrl = scan.url || scan.business_location?.url || '';
  params.set('url', businessUrl);
  params.set('keywords', scan.keywords.join(','));
  params.set('pinCount', scan.pinCount.toString());
  params.set('radius', scan.radius.toString());
  
  // Convert backend scan type format to frontend format
  const frontendScanType = scan.scanType === 'one_time' ? 'one-time' : 
                          scan.scanType === 'repeating' ? 'recurring' : 
                          scan.scanType;
  params.set('scanType', frontendScanType);
  
  // Add frequency if it's a recurring scan
  if ((frontendScanType === 'recurring' || scan.scanType === 'repeating') && scan.frequency) {
    params.set('frequency', scan.frequency);
  }
  
  return `/scan?${params.toString()}`;
}

/**
 * Truncates a URL to a specified length and adds ellipsis if needed
 */
export function truncateUrl(url: string, maxLength: number = 10): string {
  if (!url || url.length <= maxLength) return url;
  return `${url.substring(0, maxLength)}...`;
}

/**
 * Builds a URL for the success page with pre-filled scan ID
 */
export function buildSuccessUrl(scanId: string): string {
  // Create URL with query parameters
  const params = new URLSearchParams();
  
  params.set('scanId', scanId);
  
  return `/success?${params.toString()}`;
}
