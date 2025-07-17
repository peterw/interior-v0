'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import CharacterMessage from './CharacterMessage';
import OnboardingLayout from './OnboardingLayout';
import { Gift, Zap, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Brand } from '@/components/ui/brand';
import { cf } from "@/lib/cf"

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  // Auto-open Crisp chat on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
    }
  }, []);

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={10}
      onNext={onNext}
      nextButtonText="Get Started"
    >
      <div className="max-w-3xl mx-auto">
        <CharacterMessage 
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Hey! Let's Get You to #1 on Google Maps! 🚀
              </h2>
              <p className="text-gray-600">
                Complete this quick setup and earn 100 free credits (worth $10!)
              </p>
            </>
          )}
          imageSize={80}
          imageAlt="Jacky Chou"
        />
          
        <div className="mt-8 space-y-8">
          {/* Incentive Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full p-3">
                  <Gift className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Complete Onboarding & Get Rewarded!</h3>
                  <p className="text-gray-600">Earn 100 free credits (worth $10) + exclusive bonuses</p>
                </div>
              </div>
            </div>
          </Card>

          {/* What You'll Get */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Zap className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quick Setup</h3>
              <p className="text-sm text-gray-600">Get started in under 2 minutes</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Trophy className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">Join 2,847+ successful businesses</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Gift className="h-10 w-10 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">100 Free Credits</h3>
              <p className="text-sm text-gray-600">Worth $10 when you complete setup</p>
            </Card>
          </div>

          {/* Features List */}
          <div>
            <h3 className="font-semibold text-lg mb-4">What's Included:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <div>
                  <span className="font-medium">Google Business Profile Optimization</span>
                  <p className="text-sm text-gray-600">Connect and manage your GBP with powerful tools</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <div>
                  <span className="font-medium">Citation Building & Management</span>
                  <p className="text-sm text-gray-600">Build 100+ citations to boost your local rankings</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <div>
                  <span className="font-medium">Rank Tracking & Analytics</span>
                  <p className="text-sm text-gray-600">Monitor your Google Maps rankings in real-time</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Signature */}
          <div className="text-center pt-6">
            <Image
              src={cf("/images/signature.png")}
              alt="Jacky Chou's Signature"
              width={150}
              height={50}
              className="mx-auto mb-2"
            />
            <p className="text-gray-800 font-semibold">Jacky Chou</p>
            <p className="text-sm text-gray-600">Founder of <Brand variant="highlight" /></p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default WelcomeScreen;