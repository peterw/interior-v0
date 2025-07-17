/**
 * Utility functions for constructing review URLs for different platforms
 */

export interface BusinessDetails {
  placeId?: string;
  businessName?: string;
  businessAddress?: string;
  googleMapsUri?: string;
}

/**
 * Constructs a Google review URL from business details
 * @param businessDetails - The business details from Google Places API
 * @returns The Google review URL
 */
export function constructGoogleReviewUrl(businessDetails: BusinessDetails): string {
  // If we have a place ID, use the direct Google review URL
  if (businessDetails.placeId) {
    return `https://search.google.com/local/writereview?placeid=${businessDetails.placeId}`;
  }
  
  // If we have Google Maps URI, try to extract place ID or construct from that
  if (businessDetails.googleMapsUri) {
    // Try to extract place ID from Google Maps URI
    const placeIdMatch = businessDetails.googleMapsUri.match(/place\/([^\/]+)\/.*data=.*!3m1!4b1!4m\d+!3m\d+!1s([^!]+)/);
    if (placeIdMatch && placeIdMatch[2]) {
      return `https://search.google.com/local/writereview?placeid=${placeIdMatch[2]}`;
    }
    
    // Fallback: use the Google Maps URI and let Google redirect
    return businessDetails.googleMapsUri.replace('/place/', '/place/') + '/reviews';
  }
  
  // Last resort: construct search-based URL
  if (businessDetails.businessName) {
    const searchQuery = encodeURIComponent(
      businessDetails.businessAddress 
        ? `${businessDetails.businessName} ${businessDetails.businessAddress}`
        : businessDetails.businessName
    );
    return `https://www.google.com/search?q=${searchQuery}+reviews`;
  }
  
  return '';
}

/**
 * Constructs a Facebook review URL (requires Facebook page)
 * @param facebookPageId - The Facebook page ID
 * @returns The Facebook review URL
 */
export function constructFacebookReviewUrl(facebookPageId: string): string {
  return `https://www.facebook.com/${facebookPageId}/reviews`;
}

/**
 * Constructs a Yelp review URL
 * @param businessName - The business name
 * @param businessAddress - The business address
 * @returns The Yelp search URL for reviews
 */
export function constructYelpReviewUrl(businessName: string, businessAddress?: string): string {
  const searchQuery = encodeURIComponent(
    businessAddress ? `${businessName} ${businessAddress}` : businessName
  );
  return `https://www.yelp.com/biz_redir?url=https%3A%2F%2Fwww.yelp.com%2Fsearch%3Fterm%3D${searchQuery}`;
}

/**
 * Gets available review platform options with their URLs
 * @param businessDetails - The business details from Google Places API
 * @returns Array of review platform options
 */
export function getReviewPlatformOptions(businessDetails: BusinessDetails) {
  const options = [];
  
  // Google Reviews (always available)
  const googleUrl = constructGoogleReviewUrl(businessDetails);
  if (googleUrl) {
    options.push({
      platform: 'Google',
      url: googleUrl,
      icon: '🔍',
      description: 'Google Business Reviews'
    });
  }
  
  // Yelp (if we have business name)
  if (businessDetails.businessName) {
    options.push({
      platform: 'Yelp',
      url: constructYelpReviewUrl(businessDetails.businessName, businessDetails.businessAddress),
      icon: '⭐',
      description: 'Yelp Reviews'
    });
  }
  
  return options;
}

/**
 * Validates if a URL is a valid review URL
 * @param url - The URL to validate
 * @returns boolean indicating if it's a valid review URL
 */
export function isValidReviewUrl(url: string): boolean {
  if (!url) return false;
  
  const reviewDomains = [
    'google.com',
    'search.google.com', 
    'maps.google.com',
    'facebook.com',
    'yelp.com',
    'tripadvisor.com',
    'trustpilot.com'
  ];
  
  try {
    const urlObj = new URL(url);
    return reviewDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}