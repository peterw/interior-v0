'use client'

import { GoogleTagManager } from "@next/third-parties/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { PostHogProvider } from "@/components/head/posthog/provider"
import { MixpanelProvider } from "@/components/providers/mixpanel-provider"
import Fingerprint from "@/components/head/fingerprint"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from 'react'
import { ConvexTokenProvider } from "@/app/providers/ConvexProvider"
interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;


  const content = (
    <PostHogProvider>
      <MixpanelProvider>
        <AuthProvider>
          <ConvexTokenProvider>
            <Toaster />
            {children}
          </ConvexTokenProvider>
        </AuthProvider>
      </MixpanelProvider>
    </PostHogProvider>
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {/* Commented out Google Tag Manager */}
      {/* <GoogleTagManager gtmId="AW-16815238894" /> */}
      {/* <Fingerprint> */}
        {googleClientId ? (
          <GoogleOAuthProvider clientId={googleClientId}>
            {content}
          </GoogleOAuthProvider>
        ) : (
          content
        )}
      {/* </Fingerprint> */}
    </ThemeProvider>
  )
}
