'use client';

import React from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import Script from 'next/script';

interface SpecialOfferScreenProps {
  onFinish: () => void;
  onBack: () => void;
}

const SpecialOfferScreen: React.FC<SpecialOfferScreenProps> = ({ onFinish, onBack }) => {
  const handleCheckout = async () => {
    // Initialize Stripe checkout
    const stripe = (window as any).Stripe('YOUR_PUBLISHABLE_KEY');
    
    try {
      // Call your backend to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'YOUR_PRICE_ID',
        }),
      });
      
      const session = await response.json();
      
      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Script src="https://js.stripe.com/v3/" />
      
      <OnboardingLayout
        currentStep={11}
        totalSteps={11}
        onBack={onBack}
        customActions={
          <div className="flex gap-4">
            <Button
              onClick={handleCheckout}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium"
            >
              Get Started Now
            </Button>
            <Button
              onClick={onFinish}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base font-medium"
            >
              Skip for now
            </Button>
          </div>
        }
      >
        <div className="max-w-3xl mx-auto">
          <CharacterMessage
            message={(
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Limited-Time Onboarding Offer!
                </h2>
                <p className="text-gray-600">
                  One last thing... a special offer just for you!
                </p>
              </>
            )}
            imageSize={64}
            imageAlt="Jacky Chou"
          />

          <div className="text-center mt-8">
            <Gift className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              As a thank you for signing up, get <span className="font-bold">[Your Offer Details Here - e.g., 50% off your first month, extra features, etc.]</span>! This offer won't be shown again.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Pro Plan</h3>
              <div className="text-right">
                <div className="text-gray-500 line-through">$199/month</div>
                <div className="text-3xl font-bold text-blue-600">$99/month</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Unlimited citation building & management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced rank tracking for multiple locations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Competitor analysis & monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>White-label reporting</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Priority customer support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>30-day money-back guarantee</span>
              </li>
            </ul>
            
            <p className="text-center text-sm text-gray-500">
              Cancel anytime. No long-term contracts.
            </p>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

export default SpecialOfferScreen;  