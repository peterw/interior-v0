'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/auth-context'
import { useSearchParams } from 'next/navigation'
import { Icons } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { useAnalytics } from '@/hooks/use-analytics'

export function GoogleButton() {
  const { socialLogin } = useAuth()
  const searchParams = useSearchParams()
  const analytics = useAnalytics()
  
  // Check if Google Client ID is available
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  // Determine context (signup vs login) based on current path
  const isSignupPage = typeof window !== 'undefined' && window.location.pathname.includes('signup');
  const eventPrefix = isSignupPage ? 'signup' : 'login';
  
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const credentials = {
          access_token: tokenResponse.access_token,
          provider: 'google',
          visitor_id: undefined, // Add visitor_id if you have it
          utm_source: searchParams.get('utm_source') || undefined,
          utm_medium: searchParams.get('utm_medium') || undefined,
          utm_campaign: searchParams.get('utm_campaign') || undefined,
          utm_term: searchParams.get('utm_term') || undefined,
          utm_content: searchParams.get('utm_content') || undefined,
        }
        await socialLogin(credentials)
        
        // Track successful Google auth
        if (isSignupPage) {
          analytics.events.signupCompleted('google', {
            utm_source: credentials.utm_source,
            utm_medium: credentials.utm_medium,
            utm_campaign: credentials.utm_campaign,
            utm_term: credentials.utm_term,
            utm_content: credentials.utm_content,
          });
        } else {
          analytics.events.loginCompleted('google', {
            utm_source: credentials.utm_source,
            utm_medium: credentials.utm_medium,
            utm_campaign: credentials.utm_campaign,
          });
        }
      } catch (error) {
        console.error('Google login failed:', error)
        
        // Track Google auth failure
        const errorFunc = isSignupPage ? analytics.events.signupFailed : analytics.events.loginFailed;
        errorFunc('google', 'google_auth_error', {
          error_message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },
    onError: (error) => {
      console.error('Google login failed', error)
      
      // Track Google OAuth error
      const errorFunc = isSignupPage ? analytics.events.signupFailed : analytics.events.loginFailed;
      errorFunc('google', 'google_oauth_error', {});
    },
  })

  // Don't render the button if Google Client ID is not configured
  if (!googleClientId) {
    return null;
  }

  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={() => {
        // Track Google button click
        analytics.track(`google_${eventPrefix}_clicked`, {
          utm_source: searchParams.get('utm_source') || undefined,
          utm_medium: searchParams.get('utm_medium') || undefined,
          utm_campaign: searchParams.get('utm_campaign') || undefined,
        });
        login();
      }}
      className="w-full"
    >
      <Icons.google className="w-5 h-5 mr-2" />
      Continue with Google
    </Button>
  )
}

export function GoogleButtonWithDivider() {
  // Check if Google Client ID is available
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  // Don't render anything if Google Client ID is not configured
  if (!googleClientId) {
    return null;
  }

  return (
    <>
      <GoogleButton />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>
    </>
  )
}
