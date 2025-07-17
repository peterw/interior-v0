import axios from '@/lib/axios';
import { AxiosError } from 'axios';

// API URL constant
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface CreateCheckoutSessionResponse {
    checkout_url: string;
    // Add other potential fields from the response if needed
}

/**
 * Server action to create a checkout session for a business
 */
export async function createCheckoutSession(
    { businessId, purchaseType }: { businessId: string; purchaseType: 'localboost' | 'superboost' }
): Promise<{ sessionId: string, url: string }> {
    console.log(`🔄 Server Action: Creating checkout session for business ${businessId}, type: ${purchaseType} at ${BACKEND_API_URL}/citations/api/create-checkout-session/`);

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const success_url = `${origin}/boost-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = origin ? `${origin}/citations/business/${businessId}` : '';
    
    try {
        const response = await axios.post<{ checkout_url: string, session_id: string }>(`${BACKEND_API_URL}/citations/api/create-checkout-session/`, {
            business_uuid: businessId,
            purchase_type: purchaseType,
            success_url,
            cancel_url,
        });
        console.log('✅ Server Action Response: Checkout session created', response.data);
        
        if (!response.data.checkout_url) {
             console.error('Error: checkout_url missing in response data:', response.data);
             throw new Error('Failed to create checkout session: Invalid response from server.');
        }
        
        const sessionId = response.data.session_id || 'unknown';
        return { sessionId, url: response.data.checkout_url };
    } catch (error) {
        console.error(`Error creating checkout session for business ${businessId}:`, error);
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message;
            console.error('Axios error details:', error.response?.data);
            throw new Error(`Failed to create checkout session: ${errorMessage}`);
        }
         const genericErrorMessage = 'An unexpected error occurred while creating the checkout session.';
         console.error(genericErrorMessage, error);
        throw new Error(genericErrorMessage);
    }
}    