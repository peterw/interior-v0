import axios from 'axios';

/**
 * Checks if an error is due to network issues or server downtime
 * (server unreachable, DNS error, etc)
 */
export function isNetworkOrServerDownError(error: unknown): boolean {
  // Axios error with no response generally indicates 
  // the server is unavailable or network is down.
  return axios.isAxiosError(error) && !error.response;
}

/**
 * Checks if an error is due to authentication/authorization failure
 * (invalid, expired or missing token)
 */
export function isUnauthorizedError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    (error.response?.status === 401 || error.response?.status === 403)
  );
}

/**
 * Checks if an error is due to server-side issues or resource not found
 * Includes both 404 and 5xx errors
 */
export function isServerError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    error.response?.status !== undefined &&
    (error.response.status === 404 || error.response.status >= 500)
  );
} 