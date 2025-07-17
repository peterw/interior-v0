import axios from 'axios';
import { API_URL } from '@/config/constants';
import AuthService from './auth';
import { authRoutes } from '@/config/routes';
import { isUnauthorizedError, isNetworkOrServerDownError, isServerError } from './error-helpers';

// Create a custom event for auth failures
export const AUTH_FAILURE_EVENT = 'auth_failure';
// Create a custom event for network/server issues
export const NETWORK_ERROR_EVENT = 'network_error';
// Create a custom event for server errors (including 404)
export const SERVER_ERROR_EVENT = 'server_error';

// Define login-related endpoints that should not trigger token refresh
const AUTH_ENDPOINTS = [
  '/users/auth/login/',
  '/users/auth/register/',
  '/users/auth/social_login/',
];

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const authService = AuthService.getInstance();
    const token = authService.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authService = AuthService.getInstance();

    // Don't attempt refresh for auth endpoints or if we've already tried
    const isAuthEndpoint = AUTH_ENDPOINTS.some(endpoint =>
      originalRequest?.url?.endsWith(endpoint)
    );

    // Handle unauthorized errors (401)
    if (isUnauthorizedError(error) && 
        !originalRequest._retry &&
        !isAuthEndpoint &&
        authService.isAuthenticated()) {
      
      originalRequest._retry = true;

      try {
        const newToken = await authService.refreshAccessToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Only dispatch auth failure for unauthorized errors during refresh
        if (isUnauthorizedError(refreshError) && typeof window !== 'undefined') {
          window.dispatchEvent(new Event(AUTH_FAILURE_EVENT));
        } else if (isNetworkOrServerDownError(refreshError) && typeof window !== 'undefined') {
          // Dispatch network error event for client components to handle
          window.dispatchEvent(new Event(NETWORK_ERROR_EVENT));
        } else if (isServerError(refreshError) && typeof window !== 'undefined') {
          // Dispatch server error event for client components to handle
          window.dispatchEvent(new Event(SERVER_ERROR_EVENT));
        }
        return Promise.reject(refreshError);
      }
    }

    // For network errors, dispatch network error event
    if (isNetworkOrServerDownError(error) && typeof window !== 'undefined') {
      window.dispatchEvent(new Event(NETWORK_ERROR_EVENT));
    } else if (isServerError(error) && typeof window !== 'undefined') {
      // For server errors including 404, dispatch server error event
      window.dispatchEvent(new Event(SERVER_ERROR_EVENT));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

