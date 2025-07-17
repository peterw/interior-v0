/**
 * Re-export the generated API client for easier imports
 */

export * from './generated';

// Import client-side configuration to ensure OpenAPI is properly initialized
import './client-config';

// Re-export the configured OpenAPI instance
export { OpenAPI } from './client-config';

// Add a type-guard utility for API errors
import { ApiError } from './generated/core/ApiError';

/**
 * Type guard to check if an error is an API error
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Extract error message from API error response
 */
export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    // Try to get detailed error message from response
    if (error.body && typeof error.body === 'object') {
      const body = error.body as any;
      
      // Handle detail field (common in DRF)
      if (body.detail) {
        return body.detail;
      }
      
      // Handle field errors
      if (Object.keys(body).length > 0) {
        const messages: string[] = [];
        Object.entries(body).forEach(([field, errors]) => {
          if (Array.isArray(errors)) {
            messages.push(`${field}: ${errors.join(', ')}`);
          } else if (typeof errors === 'string') {
            messages.push(`${field}: ${errors}`);
          }
        });
        
        if (messages.length > 0) {
          return messages.join('; ');
        }
      }
    }
    
    // Fallback to status text
    return error.statusText || 'Unknown API error';
  }
  
  // Not an API error
  return 'An unexpected error occurred';
} 