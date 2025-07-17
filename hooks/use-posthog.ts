import { useEffect, useState, useCallback } from 'react';
import { usePostHog as usePostHogClient } from 'posthog-js/react';

interface UsePostHogReturn {
  isFeatureEnabled: (featureName: string, defaultValue?: boolean) => boolean;
  captureEvent: (eventName: string, properties?: Record<string, any>) => void;
  identify: (distinctId: string, properties?: Record<string, any>) => void;
  reloadFeatureFlags: () => Promise<void>;
  featureFlags: Record<string, boolean>;
}

export const usePostHog = (distinctId?: string): UsePostHogReturn => {
  const client = usePostHogClient();
  const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({});

  // Load feature flags and update state
  const loadFeatureFlags = useCallback(async () => {
    if (typeof window === 'undefined' || !client) return;

    try {
      await client.reloadFeatureFlags();
      // Create a map of all known feature flags
      const allFlags: Record<string, boolean> = {};

      // Get all feature flags
      const flags = client.featureFlags.getFlags();
      Object.keys(flags).forEach((flagName: string) => {
        allFlags[flagName] = client.isFeatureEnabled(flagName) ?? false;
      });

      setFeatureFlags(allFlags);
    } catch (error) {
      console.error('Error loading feature flags:', error);
    }
  }, [client]);

  useEffect(() => {
    if (typeof window !== 'undefined' && distinctId) {
      client?.identify(distinctId);
      // Load feature flags initially
      loadFeatureFlags();
    }

    return () => {
      if (typeof window !== 'undefined') {
        client?.reset();
      }
    };
  }, [distinctId, client, loadFeatureFlags]);

  // Check if a feature is enabled
  const isFeatureEnabled = (featureName: string, defaultValue = false): boolean => {
    if (typeof window === 'undefined' || !client) return defaultValue;
    return client.isFeatureEnabled(featureName) ?? defaultValue;
  };

  // Capture an event
  const captureEvent = (eventName: string, properties?: Record<string, any>): void => {
    if (typeof window === 'undefined' || !client) return;
    client.capture(eventName, properties);
  };

  // Identify a user
  const identify = (newDistinctId: string, properties?: Record<string, any>): void => {
    if (typeof window === 'undefined' || !client) return;
    client.identify(newDistinctId, properties);
  };

  // Reload feature flags
  const reloadFeatureFlags = async (): Promise<void> => {
    await loadFeatureFlags();
  };

  return {
    isFeatureEnabled,
    captureEvent,
    identify,
    reloadFeatureFlags,
    featureFlags,
  };
};
