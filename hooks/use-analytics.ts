import { useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { analytics } from '@/lib/analytics';

export const useAnalytics = () => {
  const { user } = useAuth();

  // Auto-identify user when they log in
  useEffect(() => {
    if (user?.id && user?.email) {
      analytics.identify(user.id.toString(), {
        $email: user.email,
        $name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
      });
    }
  }, [user]);

  // Return the analytics object with all methods
  return analytics;
};