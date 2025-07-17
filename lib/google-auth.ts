// Commented out Google Auth functionality
/*
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/auth-context';
import { useFingerprint } from '@/hooks/use-fingerprint';

export const useGoogleAuth = () => {
  const { socialLogin } = useAuth();
  const { visitorId } = useFingerprint();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await socialLogin({
          access_token: response.access_token,
          provider: 'google',
          ...(visitorId && { visitor_id: visitorId }),
          // Get UTM params from URL during login
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
          utm_term: new URLSearchParams(window.location.search).get('utm_term') || undefined,
          utm_content: new URLSearchParams(window.location.search).get('utm_content') || undefined,
        });
      } catch (error) {
        console.error('Google login failed:', error);
        throw error;
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      throw error;
    },
    flow: 'implicit',
  });

  return { login };
};
*/

// Mock implementation
export const useGoogleAuth = () => {
  return {
    login: () => {
      console.log('Google login disabled');
    }
  };
};
