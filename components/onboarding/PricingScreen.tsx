'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star, Zap, TrendingUp } from 'lucide-react';
import CharacterMessage from './CharacterMessage';
import OnboardingLayout from './OnboardingLayout';
import { Badge } from '@/components/ui/badge';

interface PricingScreenProps {
  onNext: (data: { selectedPlan: string }) => void;
  onBack: () => void;
  businessName?: string;
}


const PricingScreen: React.FC<PricingScreenProps> = ({ onNext, onBack, businessName }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('growth');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Basic rank tracking (50 keywords)',
        '50 citation submissions',
        'Monthly reporting',
        'Email support',
      ],
      icon: Star,
      color: 'blue',
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$99',
      period: '/month',
      description: 'Most popular for growing businesses',
      features: [
        'Advanced rank tracking (200 keywords)',
        '200+ citation submissions',
        'Weekly reporting & alerts',
        'Review management',
        'Priority support',
        'Competitor tracking',
      ],
      icon: Zap,
      color: 'green',
      popular: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$199',
      period: '/month',
      description: 'For serious local SEO',
      features: [
        'Unlimited rank tracking',
        'Unlimited citations', 
        'API access',
        'Daily reporting & alerts',
        'Advanced review management',
        'White-label reports',
        'Dedicated account manager',
      ],
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const handleContinue = () => {
    onNext({ selectedPlan });
  };

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={11}
      onNext={() => handleContinue()}
      onBack={onBack}
      nextButtonText="Continue"
    >
      <div className="max-w-4xl mx-auto">
        <CharacterMessage
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {businessName ? `Perfect! Let's Get ${businessName} to #1` : "Choose Your Plan to Rank #1"} 🏆
              </h2>
              <p className="text-gray-600">
                Select the best plan for your business growth
              </p>
            </>
          )}
          imageSize={64}
          imageAlt="Jacky Chou"
        />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`relative p-6 cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-blue-500 border-blue-500'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                      Most Popular
                    </Badge>
                  )}

                  <div className="text-center mb-4">
                    <plan.icon className={`h-12 w-12 mx-auto mb-3 text-${plan.color}-500`} />
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={selectedPlan === plan.id ? 'default' : 'outline'}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.id);
                    }}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </Card>
              </motion.div>
            ))}
        </div>

        {/* Special Offer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <Zap className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">
              Save 20% on your first 3 months!
            </span>
          </div>
        </motion.div>

        {/* Trusted by teams */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">Trusted by teams at</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="text-gray-600">
              <div className="font-medium">Real Estate Agencies</div>
            </div>
            <div className="text-gray-600">
              <div className="font-medium">Marketing Firms</div>
            </div>
            <div className="text-gray-600">
              <div className="font-medium">Local Businesses</div>
            </div>
            <div className="text-gray-600">
              <div className="font-medium">SEO Agencies</div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PricingScreen;
