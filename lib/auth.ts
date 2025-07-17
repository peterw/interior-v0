import { setCookie, deleteCookie } from 'cookies-next';
import axios from './axios';
import { isUnauthorizedError, isNetworkOrServerDownError, isServerError } from './error-helpers';

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_premium: boolean;
  is_trial: boolean;
  is_burner_account: boolean;
  fingerprint_visitor_id: string | null;
  subscription: {
    id: string;
    credit_balance: number;
    plan: string;
    subscription_status: string;
  };
}

export interface AuthResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials, UTMParams {
  visitor_id?: string;
}

export interface SocialLoginCredentials extends UTMParams {
  access_token: string;
  provider: string;
  visitor_id?: string;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;

    // Set both localStorage and cookies
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setCookie('accessToken', access, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;

    // Clear both localStorage and cookies
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await axios.post<AuthResponse>('/users/auth/login/', credentials);
    this.setTokens(data.tokens.access, data.tokens.refresh);
    return data;
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await axios.post<AuthResponse>('/users/auth/register/', credentials);
    this.setTokens(data.tokens.access, data.tokens.refresh);
    return data;
  }

  public async logout(): Promise<void> {
    if (!this.refreshToken) return;

    try {
      await axios.post('/users/auth/logout/', {
        refresh_token: this.refreshToken
      });
    } finally {
      this.clearTokens();
      // Dispatch logout event to clean up polling
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('user-logout'));
      }
    }
  }

  public async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const { data } = await axios.post<{ access: string }>('/users/token/refresh/', {
        refresh: this.refreshToken
      });

      this.accessToken = data.access;
      localStorage.setItem('accessToken', data.access);
      setCookie('accessToken', data.access, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
      return data.access;
    } catch (error) {
      // Only clear tokens for actual auth errors, not for network or server issues
      if (isUnauthorizedError(error)) {
        this.clearTokens();
      } else {
        console.warn('Token refresh failed but not clearing tokens due to non-auth error:', error);
      }
      throw error;
    }
  }

  public async getCurrentUser(): Promise<User> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const { data } = await axios.get<User>('/users/auth/me/');
      return data;
    } catch (error) {
      // For network errors (like ERR_CONNECTION_REFUSED), we should not treat it as an auth error
      if (isUnauthorizedError(error)) {
        // Only clear token for actual auth errors
        console.error('Authentication error in getCurrentUser:', error);
      } else if (isNetworkOrServerDownError(error)) {
        console.warn('Server appears to be down in getCurrentUser but keeping tokens:', error);
      } else if (isServerError(error)) {
        console.warn('Server error in getCurrentUser but keeping tokens:', error);
      }
      throw error;
    }
  }

  public isAuthenticated(): boolean {
    // Check both localStorage and cookie token
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('accessToken');
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      return !!(localToken && cookieToken && localToken === cookieToken);
    }
    return false;
  }

  public async socialLogin(credentials: SocialLoginCredentials): Promise<AuthResponse> {
    const { data } = await axios.post<AuthResponse>('/users/auth/google/', {
      token: credentials.access_token,
      visitor_id: credentials.visitor_id,
      utm_source: credentials.utm_source,
      utm_medium: credentials.utm_medium,
      utm_campaign: credentials.utm_campaign,
      utm_term: credentials.utm_term,
      utm_content: credentials.utm_content
    });
    this.setTokens(data.tokens.access, data.tokens.refresh);
    return data;
  }
}

export default AuthService;

