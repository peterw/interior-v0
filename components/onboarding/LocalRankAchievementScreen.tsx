'use client';

import React from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import { Trophy, TrendingUp, Star, DollarSign } from 'lucide-react';
import { Brand } from '@/components/ui/brand';

interface LocalRankAchievementScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const LocalRankAchievementScreen: React.FC<LocalRankAchievementScreenProps> = ({ onNext, onBack }) => {
  return (
    <OnboardingLayout
      currentStep={10}
      totalSteps={11}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="max-w-3xl mx-auto">
        <CharacterMessage
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Here's what you'll achieve
              </h2>
              <p className="text-gray-600">
                Awesome! Here's what <Brand variant="highlight" /> members typically achieve:
              </p>
            </>
          )}
          imageSize={64}
          imageAlt="Jacky Chou"
        />

        <div className="space-y-6 mt-8">
          <div className="flex items-center">
            <Trophy className="h-10 w-10 text-yellow-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">Rank #1 on Google Maps</h3>
              <p className="text-gray-500 text-sm">Climb 5+ positions in just 90 days</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-green-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">3x More Visibility</h3>
              <p className="text-gray-500 text-sm">Get listed in 200+ directories</p>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">Better Reviews & Reputation</h3>
              <p className="text-gray-500 text-sm">Manage and respond to reviews easily</p>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-10 w-10 text-purple-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800">2x Revenue Growth</h3>
              <p className="text-gray-500 text-sm">More calls, more customers, more revenue</p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default LocalRankAchievementScreen;
