/**
 * Client-side OpenAPI configuration
 * This file ensures OpenAPI is properly configured as soon as the module loads
 * preventing race conditions where components try to use OpenAPI before it's initialized
 */

import { OpenAPI } from './generated';
import AuthService from '../auth';
import { ApiRequestOptions } from './generated/core/ApiRequestOptions';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  // Configure OpenAPI immediately when this module loads on the client
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  // Set TOKEN resolver to get the current access token from AuthService
  OpenAPI.TOKEN = async (_options: ApiRequestOptions): Promise<string> => {
    const authService = AuthService.getInstance();
    return authService.getAccessToken() || '';
  };
  
  console.log('OpenAPI configured immediately on client load with BASE:', OpenAPI.BASE);
}

export { OpenAPI }; 