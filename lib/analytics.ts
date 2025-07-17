import { trackEvent as trackMixpanelEvent, identifyUser as identifyMixpanelUser, setUserProperties as setMixpanelUserProperties, trackPageView as trackMixpanelPageView, resetUser as resetMixpanelUser, incrementUserProperty as incrementMixpanelUserProperty, trackRevenue as trackMixpanelRevenue } from './mixpanel';
import posthog from 'posthog-js';

interface AnalyticsEventProperties {
  [key: string]: any;
}

interface UserProperties {
  [key: string]: any;
}

// Unified analytics service that tracks to both Mixpanel and PostHog
export const analytics = {
  // Track event to both platforms
  track: (eventName: string, properties?: AnalyticsEventProperties) => {
    // Track to Mixpanel
    trackMixpanelEvent(eventName, properties);
    
    // Track to PostHog
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture(eventName, properties);
    }
  },

  // Track page view
  trackPageView: (pageName: string, properties?: AnalyticsEventProperties) => {
    // Track to Mixpanel
    trackMixpanelPageView(pageName, properties);
    
    // Track to PostHog
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        $pathname: window.location.pathname,
        page_name: pageName,
        ...properties
      });
    }
  },

  // Identify user on both platforms
  identify: (userId: string, properties?: UserProperties) => {
    // Identify in Mixpanel
    identifyMixpanelUser(userId, properties);
    
    // Identify in PostHog
    if (typeof window !== 'undefined' && posthog) {
      posthog.identify(userId, properties);
    }
  },

  // Set user properties
  setUserProperties: (properties: UserProperties) => {
    // Set in Mixpanel
    setMixpanelUserProperties(properties);
    
    // Set in PostHog
    if (typeof window !== 'undefined' && posthog) {
      posthog.setPersonProperties(properties);
    }
  },

  // Increment user property
  incrementUserProperty: (propertyName: string, value: number = 1) => {
    // Increment in Mixpanel
    incrementMixpanelUserProperty(propertyName, value);
    
    // PostHog doesn't have a direct increment method, so we track as an event
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture('property_incremented', {
        property_name: propertyName,
        increment_value: value
      });
    }
  },

  // Track revenue
  trackRevenue: (amount: number, properties?: AnalyticsEventProperties) => {
    // Track in Mixpanel
    trackMixpanelRevenue(amount, properties);
    
    // Track in PostHog
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture('revenue', {
        revenue: amount,
        ...properties
      });
    }
  },

  // Reset user (for logout)
  reset: () => {
    // Reset in Mixpanel
    resetMixpanelUser();
    
    // Reset in PostHog
    if (typeof window !== 'undefined' && posthog) {
      posthog.reset();
    }
  },

  // Common event helpers
  events: {
    // Authentication events
    signupPageViewed: (properties?: AnalyticsEventProperties) => 
      analytics.track('signup_page_viewed', properties),
    
    signupStarted: (properties?: AnalyticsEventProperties) => 
      analytics.track('signup_form_started', properties),
    
    signupAttempted: (method: 'email' | 'google', properties?: AnalyticsEventProperties) => 
      analytics.track('signup_attempted', { method, ...properties }),
    
    signupCompleted: (method: 'email' | 'google', properties?: AnalyticsEventProperties) => 
      analytics.track('signup_completed', { method, ...properties }),
    
    signupFailed: (method: 'email' | 'google', errorType: string, properties?: AnalyticsEventProperties) => 
      analytics.track('signup_failed', { method, error_type: errorType, ...properties }),
    
    loginPageViewed: (properties?: AnalyticsEventProperties) => 
      analytics.track('login_page_viewed', properties),
    
    loginAttempted: (method: 'email' | 'google', properties?: AnalyticsEventProperties) => 
      analytics.track('login_attempted', { method, ...properties }),
    
    loginCompleted: (method: 'email' | 'google', properties?: AnalyticsEventProperties) => 
      analytics.track('login_completed', { method, ...properties }),
    
    loginFailed: (method: 'email' | 'google', errorType: string, properties?: AnalyticsEventProperties) => 
      analytics.track('login_failed', { method, error_type: errorType, ...properties }),

    // Dashboard events
    dashboardViewed: (properties?: AnalyticsEventProperties) => 
      analytics.track('dashboard_viewed', properties),
    
    onboardingStepCompleted: (stepId: number, stepTitle: string, properties?: AnalyticsEventProperties) => 
      analytics.track('onboarding_step_completed', { step_id: stepId, step_title: stepTitle, ...properties }),
    
    onboardingDismissed: (properties?: AnalyticsEventProperties) => 
      analytics.track('onboarding_checklist_dismissed', properties),
    
    quickActionClicked: (action: string, properties?: AnalyticsEventProperties) => 
      analytics.track('quick_action_clicked', { action, ...properties }),

    // Scan events
    scanPageViewed: (properties?: AnalyticsEventProperties) => 
      analytics.track('scan_page_viewed', properties),
    
    scanStarted: (properties?: AnalyticsEventProperties) => 
      analytics.track('scan_started', properties),
    
    scanCompleted: (scanId: string, properties?: AnalyticsEventProperties) => 
      analytics.track('scan_completed', { scan_id: scanId, ...properties }),
    
    scanFailed: (errorType: string, properties?: AnalyticsEventProperties) => 
      analytics.track('scan_failed', { error_type: errorType, ...properties }),

    // Monetization events
    upgradePageViewed: (activeTab: string, properties?: AnalyticsEventProperties) => 
      analytics.track('upgrade_page_viewed', { active_tab: activeTab, ...properties }),
    
    pricingTabToggled: (tab: string, fromTab: string, properties?: AnalyticsEventProperties) => 
      analytics.track('pricing_tab_toggled', { tab, from_tab: fromTab, ...properties }),
    
    pricingIntervalToggled: (interval: string, fromInterval: string, properties?: AnalyticsEventProperties) => 
      analytics.track('pricing_interval_toggled', { interval, from_interval: fromInterval, ...properties }),
    
    checkoutInitiated: (planName: string, planType: string, price: number, properties?: AnalyticsEventProperties) => 
      analytics.track('checkout_initiated', { plan_name: planName, plan_type: planType, price, ...properties }),
    
    checkoutCompleted: (sessionId: string, properties?: AnalyticsEventProperties) => 
      analytics.track('checkout_completed', { session_id: sessionId, ...properties }),
  }
};