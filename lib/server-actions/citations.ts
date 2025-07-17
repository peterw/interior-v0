import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { Citation, CitationListResponse, SubscriptionStatus } from '@/app/(protected-views)/(features)/citations/types';

// API URL constant
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Server action to create a new citation
 */
export async function createCitation(business: string, test_mode: boolean = false): Promise<Citation> {
  console.log(`🔄 Server Action: Creating citation for business ${business} at ${BACKEND_API_URL}/citations/create/`, { test_mode });
  
  try {
    const response = await axios.post(`${BACKEND_API_URL}/citations/create/`, {
      business,
      test_mode
    });
    console.log('✅ Server Action Response: Citation created', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating citation:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to create citation: ${errorMessage}`);
    }
    throw new Error('Failed to create citation');
  }
}

/**
 * Server action to list citations with optional filtering
 */
export async function listCitations(params: {
  business_id?: string;
  page?: number;
  page_size?: number;
  status?: string;
  ordering?: string;
} = {}): Promise<CitationListResponse> {
  const urlParams = new URLSearchParams();
  
  // Add all provided params to the URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, value.toString());
    }
  });
  
  const url = `${BACKEND_API_URL}/citations/list/${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
  console.log(`🔄 Server Action: Fetching citations from ${url}`);
  
  try {
    const response = await axios.get(url);
    console.log('✅ Server Action Response: Citations list', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching citations:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch citations: ${errorMessage}`);
    }
    throw new Error('Failed to fetch citations');
  }
}

/**
 * Server action to retry a failed citation deployment
 */
export async function retryCitation(citationId: string | number): Promise<void> {
  console.log(`🔄 Server Action: Retrying citation ${citationId} at ${BACKEND_API_URL}/citations/links/${citationId}/retry_deployment/`);
  
  try {
    const response = await axios.post(`${BACKEND_API_URL}/citations/links/${citationId}/retry_deployment/`);
    console.log(`✅ Server Action Response: Citation ${citationId} retry initiated`, response.data);
  } catch (error) {
    console.error(`Error retrying citation ${citationId}:`, error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to retry citation: ${errorMessage}`);
    }
    throw new Error('Failed to retry citation');
  }
}

/**
 * Server action to fetch subscription status
 */
export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  console.log(`🔄 Server Action: Fetching subscription status from ${BACKEND_API_URL}/citations/subscription-status/`);
  
  try {
    const response = await axios.get(`${BACKEND_API_URL}/citations/subscription-status/`);
    console.log('✅ Server Action Response: Subscription status', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch subscription status: ${errorMessage}`);
    }
    throw new Error('Failed to fetch subscription status');
  }
}

/**
 * Server action to check deployment status with Cloudflare
 * This endpoint checks if a citation's deployment is still pending on Cloudflare
 * even when the citation is marked as DEPLOYED in our database
 */
/* Deployment status functionality temporarily disabled
export async function checkDeploymentStatus(domain?: string): Promise<{
  success: boolean;
  count: number;
  results: Array<{
    domain: string;
    cloudflare_project?: string;
    citation_id: string;
    deployment_status: string; // Changed to string to handle any status value
    url_path: string;
  }>;
}> {
  console.log(`🔄 Server Action: Checking deployment status ${domain ? `for domain ${domain}` : 'for all domains'}`);
  
  try {
    const url = domain 
      ? `${BACKEND_API_URL}/citations/deployment-status/?domain=${domain}` 
      : `${BACKEND_API_URL}/citations/deployment-status/`;
    
    const response = await axios.get(url);
    console.log('✅ Server Action Response: Deployment status', response.data);
    
    if (response.data && response.data.results) {
      response.data.results = response.data.results.map((result: any) => {
        if (!['PENDING', 'COMPLETED', 'FAILED'].includes(result.deployment_status)) {
          console.warn(`Unexpected deployment status received: ${result.deployment_status} for citation ${result.citation_id}`);
        }
        return result;
      });
    }
    
    return response.data;
  } catch (error) {
    console.error('Error checking deployment status:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Failed to check deployment status: ${errorMessage}`);
    }
    throw new Error('Failed to check deployment status');
  }
}
*/

/**
 * Server action to fetch one-time purchases
 */
export async function fetchOneTimePurchases(params: {
  page?: number;
  page_size?: number;
  status?: string;
  ordering?: string;
  keyword?: string;
} = {}): Promise<any> {
  const urlParams = new URLSearchParams();
  
  // Add all provided params to the URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, value.toString());
    }
  });
  
  const url = `${BACKEND_API_URL}/citations/one-time-purchases/${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
  console.log(`🔄 Server Action: Fetching one-time purchases from ${url}`);
  
  try {
    const response = await axios.get(url);
    console.log('✅ Server Action Response: One-time purchases', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching one-time purchases:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch one-time purchases: ${errorMessage}`);
    }
    throw new Error('Failed to fetch one-time purchases');
  }
}

/**
 * Server action to fetch bonus citations for a business
 */
export async function fetchBonusCitations(params: {
  business_id: string;
  page?: number;
  page_size?: number;
  boost_type?: "localboost" | "superboost";
}): Promise<any> {
  const urlParams = new URLSearchParams();
  
  // Add all provided params to the URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, value.toString());
    }
  });
  
  const url = `${BACKEND_API_URL}/citations/bonus-citations/${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
  console.log(`🔄 Server Action: Fetching bonus citations from ${url}`);
  
  try {
    const response = await axios.get(url);
    console.log('✅ Server Action Response: Bonus citations', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching bonus citations:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch bonus citations: ${errorMessage}`);
    }
    throw new Error('Failed to fetch bonus citations');
  }
}

/**
 * Server action to check user's free LocalBoost status
 */
export async function checkFreeLocalBoostStatus(): Promise<{ 
  eligible: boolean; 
  remaining_today: number;
  daily_limit: number;
}> {
  console.log(`🔄 Server Action: Checking free LocalBoost status from ${BACKEND_API_URL}/citations/free-localboost-status/`);
  
  try {
    const response = await axios.get(`${BACKEND_API_URL}/citations/free-localboost-status/`);
    console.log('✅ Server Action Response: Free LocalBoost status', response.data);
    return response.data;
  } catch (error) {
    console.error('Error checking free LocalBoost status:', error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to check free LocalBoost status: ${errorMessage}`);
    }
    throw new Error('Failed to check free LocalBoost status');
  }
}

/**
 * Server action to activate a free LocalBoost for a business
 */
export async function activateFreeLocalBoost(businessId: string): Promise<any> {
  console.log(`🔄 Server Action: Activating free LocalBoost for business ${businessId} at ${BACKEND_API_URL}/citations/activate-free-localboost/`);
  
  try {
    const response = await axios.post(`${BACKEND_API_URL}/citations/activate-free-localboost/`, {
      business_uuid: businessId
    });
    console.log('✅ Server Action Response: Free LocalBoost activated', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error activating free LocalBoost for business ${businessId}:`, error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to activate free LocalBoost: ${errorMessage}`);
    }
    throw new Error('Failed to activate free LocalBoost');
  }
}

/**
 * Helper function to check eligibility and activate a free LocalBoost if available
 * Returns an object with success status and information about the activation
 */
export async function tryActivateFreeLocalBoost(businessId: string): Promise<{
  success: boolean;
  activated: boolean;
  remaining_boosts?: number;
  error?: string;
}> {
  console.log(`🔍 DEBUG: tryActivateFreeLocalBoost called for business ${businessId}`);
  try {
    console.log(`🔍 DEBUG: About to check free LocalBoost status`);
    const status = await checkFreeLocalBoostStatus();
    console.log(`🔍 DEBUG: Free LocalBoost status response:`, status);
    
    if (status.eligible && status.remaining_today > 0) {
      console.log(`🔍 DEBUG: User is eligible for free LocalBoost. Remaining: ${status.remaining_today}`);
      
      console.log(`🔍 DEBUG: About to activate free LocalBoost for business: ${businessId}`);
      const activationResult = await activateFreeLocalBoost(businessId);
      console.log(`🔍 DEBUG: Activation result:`, activationResult);
      
      const result = {
        success: true,
        activated: true,
        remaining_boosts: status.remaining_today - 1
      };
      console.log(`🔍 DEBUG: Returning result:`, result);
      return result;
    } else {
      console.log(`🔍 DEBUG: User not eligible for free LocalBoost. eligible=${status.eligible}, remaining_today=${status.remaining_today}`);
    }
    
    const result = {
      success: true,
      activated: false
    };
    console.log(`🔍 DEBUG: Returning result (not activated):`, result);
    return result;
  } catch (error) {
    console.error('Error in tryActivateFreeLocalBoost:', error);
    const result = {
      success: false,
      activated: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    console.log(`🔍 DEBUG: Returning error result:`, result);
    return result;
  }
}
