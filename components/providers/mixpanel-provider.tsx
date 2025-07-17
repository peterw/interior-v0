'use client'

import { useEffect } from 'react';
import { initMixpanel } from '@/lib/mixpanel';

interface MixpanelProviderProps {
  children: React.ReactNode;
}

export function MixpanelProvider({ children }: MixpanelProviderProps) {
  useEffect(() => {
    // Initialize Mixpanel when the provider mounts
    initMixpanel();
  }, []);

  return <>{children}</>;
}