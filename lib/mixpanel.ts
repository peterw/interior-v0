import mixpanel, { Dict } from 'mixpanel-browser';

// Mixpanel configuration
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';
const isDevelopment = process.env.NODE_ENV === 'development';

// Initialize Mixpanel
export const initMixpanel = () => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: isDevelopment,
      track_pageview: true,
      persistence: 'localStorage',
      ignore_dnt: true,
      api_host: 'https://api-js.mixpanel.com', // Use US servers
      loaded: function(mixpanel: any) {
        // Identify distinct_id from mixpanel cookie if it exists
        const distinct_id = mixpanel.get_distinct_id();
        console.log('Mixpanel loaded with distinct_id:', distinct_id);
      }
    });
  }
};

// Track event helper
export const trackEvent = (eventName: string, properties?: Dict) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    // Add common properties to all events
    const enhancedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      platform: 'web',
      environment: isDevelopment ? 'development' : 'production',
    };
    
    mixpanel.track(eventName, enhancedProperties);
    
    if (isDevelopment) {
      console.log(`[Mixpanel] Event: ${eventName}`, enhancedProperties);
    }
  }
};

// Identify user
export const identifyUser = (userId: string, userProperties?: Dict) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
    
    if (userProperties) {
      mixpanel.people.set(userProperties);
      mixpanel.people.set_once({
        '$created': new Date().toISOString(),
        'first_seen': new Date().toISOString(),
      });
    }
    
    if (isDevelopment) {
      console.log(`[Mixpanel] User identified: ${userId}`, userProperties);
    }
  }
};

// Set user properties
export const setUserProperties = (properties: Dict) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.people.set(properties);
    
    if (isDevelopment) {
      console.log('[Mixpanel] User properties set:', properties);
    }
  }
};

// Increment user property
export const incrementUserProperty = (propertyName: string, incrementBy: number = 1) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.people.increment(propertyName, incrementBy);
    
    if (isDevelopment) {
      console.log(`[Mixpanel] User property incremented: ${propertyName} by ${incrementBy}`);
    }
  }
};

// Track revenue
export const trackRevenue = (amount: number, properties?: Dict) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.people.track_charge(amount, properties);
    
    if (isDevelopment) {
      console.log(`[Mixpanel] Revenue tracked: $${amount}`, properties);
    }
  }
};

// Reset user (for logout)
export const resetUser = () => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.reset();
    
    if (isDevelopment) {
      console.log('[Mixpanel] User reset');
    }
  }
};

// Time event (for measuring duration)
export const timeEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.time_event(eventName);
    
    if (isDevelopment) {
      console.log(`[Mixpanel] Timer started for event: ${eventName}`);
    }
  }
};

// Register super properties (properties sent with every event)
export const registerSuperProperties = (properties: Dict) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.register(properties);
    
    if (isDevelopment) {
      console.log('[Mixpanel] Super properties registered:', properties);
    }
  }
};

// Opt user out of tracking
export const optOut = () => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.opt_out_tracking();
    
    if (isDevelopment) {
      console.log('[Mixpanel] User opted out of tracking');
    }
  }
};

// Opt user back in to tracking
export const optIn = () => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.opt_in_tracking();
    
    if (isDevelopment) {
      console.log('[Mixpanel] User opted in to tracking');
    }
  }
};

// Get current user's distinct ID
export const getDistinctId = (): string | null => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    return mixpanel.get_distinct_id();
  }
  return null;
};

// Track page view with custom properties
export const trackPageView = (pageName: string, properties?: Dict) => {
  trackEvent('page_viewed', {
    page_name: pageName,
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer,
    ...properties,
  });
};

// Export mixpanel instance for advanced usage
export default mixpanel;