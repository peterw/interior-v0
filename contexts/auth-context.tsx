import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LoginCredentials, RegisterCredentials, User, SocialLoginCredentials } from '@/lib/auth'
import AuthService from '@/lib/auth'
import { authRoutes, dashboardMenuRoutes } from '@/config/routes'
import { Loading } from '@/components/loading'
import { AUTH_FAILURE_EVENT, NETWORK_ERROR_EVENT, SERVER_ERROR_EVENT } from '@/lib/axios'
import { isNetworkOrServerDownError, isUnauthorizedError, isServerError } from '@/lib/error-helpers'
import { usePostHog as usePostHogClient } from 'posthog-js/react'
import { getPostLoginRedirectPath } from '@/lib/subscription-utils'
import mixpanel from '@/lib/mixpanel'

// Extend Window interface to include Clarity
declare global {
  interface Window {
    clarity: (command: string, ...args: any[]) => void;
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  networkError: boolean
  serverError: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  socialLogin: (credentials: SocialLoginCredentials) => Promise<void>
  handleAuthFailure: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [networkError, setNetworkError] = useState(false)
  const [serverError, setServerError] = useState(false)
  const router = useRouter()
  const authService = AuthService.getInstance()
  const posthog = usePostHogClient()
  const pollingInterval = useRef<NodeJS.Timeout>()

  const stopPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
      pollingInterval.current = undefined
    }
  }, [])

  // Handle auth failures (token refresh, etc.)
  const handleAuthFailure = useCallback(async () => {
    stopPolling()
    setUser(null)
    await authService.logout()
    // Use router.replace instead of push to prevent back navigation to protected routes
    router.replace(authRoutes.login.path)
  }, [authService, router, stopPolling])

  const startPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
    }

    const fetchUserData = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser()
          setUser(userData)
          try {
            if (typeof window !== 'undefined' && posthog) {
              posthog.identify(userData.email, {
                id: userData.id,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                is_premium: userData.is_premium,
                is_trial: userData.is_trial,
                is_burner_account: userData.is_burner_account,
                subscription_plan: userData.subscription?.plan ?? null,
                subscription_status: userData.subscription?.subscription_status ?? null,
              });
            }
          } catch (error) {
            console.error('Failed to identify user in PostHog:', error);
          }

          try {
            if (typeof window !== 'undefined' && window.mixpanel) {
              mixpanel.identify(userData.email);
              mixpanel.people.set({
                '$name': `${userData.first_name} ${userData.last_name}`.trim(),
                '$email': userData.email,
                'id': userData.id,
                'first_name': userData.first_name,
                'last_name': userData.last_name,
                'is_premium': userData.is_premium,
                'is_trial': userData.is_trial,
                'is_burner_account': userData.is_burner_account,
                'subscription_plan': userData.subscription?.plan ?? null,
                'subscription_status': userData.subscription?.subscription_status ?? null,
              });
            }
          } catch (error) {
            console.error('Failed to identify user in Mixpanel:', error);
          }

          try {
            if (typeof window !== 'undefined' && window.clarity) {
              window.clarity('identify', userData.email);
            }
          } catch (error) {
            console.error('Failed to identify user in Clarity:', error);
          }
        } else {
          stopPolling()
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        
        if (isUnauthorizedError(error)) {
          // Only log out the user if it's a true auth failure
          await handleAuthFailure()
        } else if (isNetworkOrServerDownError(error)) {
          // Server is unreachable; do NOT log out the user.
          console.warn('Unable to reach server, but keeping user logged in')
          // Optionally display an error banner or some fallback UI
        } else if (isServerError(error)) {
          // Server error but token might still be valid
          console.warn('Server error occurred, but keeping user logged in')
        } else {
          // Some other error, but not authentication related
          console.error('Unexpected error fetching user data:', error)
        }
      }
    }

    // Poll once daily instead of every 5 minutes
    pollingInterval.current = setInterval(fetchUserData, 24 * 60 * 60 * 1000)
  }, [authService, stopPolling, handleAuthFailure])

  // Set up proactive token refresh that works better with cross-domain setups
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        // Get the token from localStorage, which is more reliable in cross-domain setups
        const token = localStorage.getItem('accessToken');
        if (token) {
          // Refresh token to ensure cookie and localStorage stay in sync
          await authService.refreshAccessToken()
          console.log('Access token refreshed and cookies synced')
        }
      } catch (error) {
        console.error('Error refreshing token in background:', error)
        
        if (isUnauthorizedError(error)) {
          // Only log out if it's a true auth failure (invalid/expired token)
          await handleAuthFailure()
        } else if (isNetworkOrServerDownError(error)) {
          // Don't force logout if the server is just down
          console.warn('Unable to refresh token due to network/server issues, will retry later')
        } else if (isServerError(error)) {
          // Server error, will retry later
          console.warn('Server error occurred during token refresh, will retry later')
        } else {
          // Some other error, but not immediately auth-related
          console.error('Unexpected error refreshing token:', error)
        }
      }
    }, 24 * 60 * 60 * 1000) // Once daily is sufficient
    
    return () => clearInterval(refreshInterval)
  }, [authService, handleAuthFailure])

  // Listen for auth failures from axios interceptor
  useEffect(() => {
    const handleAuthFailureEvent = () => {
      handleAuthFailure()
    }

    const handleNetworkErrorEvent = () => {
      setNetworkError(true)
      // After some time, reset the network error state
      setTimeout(() => setNetworkError(false), 10000)
    }
    
    const handleServerErrorEvent = () => {
      setServerError(true)
      // After some time, reset the server error state
      setTimeout(() => setServerError(false), 10000)
    }

    window.addEventListener(AUTH_FAILURE_EVENT, handleAuthFailureEvent)
    window.addEventListener(NETWORK_ERROR_EVENT, handleNetworkErrorEvent)
    window.addEventListener(SERVER_ERROR_EVENT, handleServerErrorEvent)
    
    return () => {
      window.removeEventListener(AUTH_FAILURE_EVENT, handleAuthFailureEvent)
      window.removeEventListener(NETWORK_ERROR_EVENT, handleNetworkErrorEvent)
      window.removeEventListener(SERVER_ERROR_EVENT, handleServerErrorEvent)
      stopPolling()
    }
  }, [handleAuthFailure, stopPolling])

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true)
      try {
        // Check both conditions: isAuthenticated and valid token
        if (authService.isAuthenticated()) {
          try {
            const userData = await authService.getCurrentUser()
            setUser(userData)
            startPolling() // Start polling after successful authentication
          } catch (error) {
            console.error('Token validation failed:', error)
            
            if (isUnauthorizedError(error)) {
              // Only log out if it's a true auth failure
              await handleAuthFailure()
            } else if (isNetworkOrServerDownError(error)) {
              // If network issues at startup, still allow login screen but don't force logout
              setIsLoading(false)
            } else if (isServerError(error)) {
              // Server errors shouldn't prevent app from loading
              setIsLoading(false)
            } else {
              console.error('Unexpected error validating token:', error)
              setIsLoading(false)
            }
          }
        } else {
          // If we're on a protected route, redirect to login
          const isProtectedRoute = window.location.pathname.startsWith('/dashboard') ||
                                 window.location.pathname.startsWith('/videos') ||
                                 window.location.pathname.startsWith('/integrations') ||
                                 window.location.pathname.startsWith('/profile') ||
                                 window.location.pathname.startsWith('/settings') ||
                                 window.location.pathname.startsWith('/success')

          if (isProtectedRoute) {
            router.replace(authRoutes.login.path)
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    return () => {
      stopPolling()
    }
  }, [authService, router, handleAuthFailure, startPolling, stopPolling])

  // Add effect to identify user in PostHog when user state changes
  useEffect(() => {
    if (typeof window === 'undefined' || !posthog) return;

    if (user) {
      // Identify the user with their email as the distinct ID and pass relevant traits
      posthog.identify(user.email, {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_premium: user.is_premium,
        is_trial: user.is_trial,
        is_burner_account: user.is_burner_account,
        subscription_plan: user.subscription?.plan ?? null,
        subscription_status: user.subscription?.subscription_status ?? null,
      });
    } else {
      // If user logs out or becomes null, reset PostHog anonymous ID
      posthog.reset();
    }
  }, [user, posthog]);

  // Add effect to identify user in Mixpanel when user state changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.mixpanel) return;

    if (user) {
      // Identify the user with their email as the distinct ID
      mixpanel.identify(user.email);
      mixpanel.people.set({
        '$name': `${user.first_name} ${user.last_name}`.trim(),
        '$email': user.email,
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_premium': user.is_premium,
        'is_trial': user.is_trial,
        'is_burner_account': user.is_burner_account,
        'subscription_plan': user.subscription?.plan ?? null,
        'subscription_status': user.subscription?.subscription_status ?? null,
      });
    } else {
      // If user logs out or becomes null, reset Mixpanel
      mixpanel.reset();
    }
  }, [user]);

  // Add effect to identify user in Microsoft Clarity when user state changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.clarity) return;

    if (user) {
      // Identify the user with their email
      try {
        window.clarity('identify', user.email);
      } catch (error) {
        console.error('Failed to identify user in Clarity:', error);
      }
    }
  }, [user]);

  // Return loading state if we're still initializing or waiting for fingerprint
  if (isLoading) {
    return (
      <Loading
        size="full"
        title="Initializing LocalRank"
        description="Setting up your workspace..."
      />
    )
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      // Fix the spread operator issue by creating a properly typed object
      const loginData: any = {...credentials};

    
      const response = await authService.login(loginData);
      setUser(response.user)
      startPolling() // Start polling after successful login
      
      const redirectPath = getPostLoginRedirectPath(response.user)
      router.push(redirectPath)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      // Fix the spread operator issue by creating a properly typed object
      const registerData = {...credentials};
      
      const response = await authService.register(registerData);
      setUser(response.user)
      startPolling() // Start polling after successful registration
      
      const redirectPath = getPostLoginRedirectPath(response.user)
      router.push(redirectPath)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      stopPolling()
      await authService.logout()
      setUser(null)
      // Ensure PostHog is reset on explicit logout as well
      if (typeof window !== 'undefined') {
        posthog?.reset();
        // Reset Mixpanel on logout as well
        if (window.mixpanel) {
          mixpanel.reset();
        }
      }
      router.replace(authRoutes.login.path)
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  const socialLogin = async (credentials: SocialLoginCredentials) => {
    try {
      // Fix the spread operator issue by creating a properly typed object
      const socialLoginData = {...credentials};

      const response = await authService.socialLogin(socialLoginData);
      setUser(response.user)
      startPolling() // Start polling after successful social login
      
      const redirectPath = getPostLoginRedirectPath(response.user)
      router.push(redirectPath)
    } catch (error) {
      console.error('Social login failed:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      networkError,
      serverError,
      login,
      register,
      logout,
      socialLogin,
      handleAuthFailure
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
