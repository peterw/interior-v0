'use client';

import React from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import { Zap } from 'lucide-react';

interface CitationsGenerationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const CitationsGenerationScreen: React.FC<CitationsGenerationScreenProps> = ({ onNext, onBack }) => {
  return (
    <OnboardingLayout
      currentStep={8}
      totalSteps={11}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="max-w-3xl mx-auto">
        <CharacterMessage
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Generate 200+ Citations Instantly
              </h2>
              <p className="text-gray-600">
                Ready to save hours? We'll handle the tedious citation building for you!
              </p>
            </>
          )}
          imageSize={64}
          imageAlt="Jacky Chou"
        />
        
        <div className="text-center mt-8">
          <Zap className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            With LocalRank, building your online presence is effortless. We submit your business information to over 200 relevant directories, saving you hours of manual work.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CitationsGenerationScreen;  