'use client'

import { useEffect } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import SuspendedPostHogPageView from './page-view';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      if (POSTHOG_KEY && POSTHOG_HOST) {
        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
          capture_pageleave: true,
          session_recording: {
            maskAllInputs: false,
            maskInputOptions: {
              password: true,
              email: false,
            },
          },
        })
      }
    }, [])
    
    return (
      <PHProvider client={posthog}>
        <SuspendedPostHogPageView />
        {children}
      </PHProvider>
    )
}
