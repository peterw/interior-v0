'use client';

import React from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import Script from 'next/script';

interface CitationsEducationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const CitationsEducationScreen: React.FC<CitationsEducationScreenProps> = ({ onNext, onBack }) => {
  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      <Script src="https://fast.wistia.com/embed/s8g2niw2w5.js" strategy="lazyOnload" type="module" />
      
      <OnboardingLayout
        currentStep={7}
        totalSteps={11}
        onNext={onNext}
        onBack={onBack}
      >
        <div className="max-w-3xl mx-auto">
          <CharacterMessage
            message={(
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Understanding Citations is Key to Climbing the Local Ranks
                </h2>
                <p className="text-gray-600">
                  Let me show you how citations impact your local rankings
                </p>
              </>
            )}
            imageSize={64}
            imageAlt="Jacky Chou"
          />

          <div className="relative w-full aspect-video mb-8">
            <style jsx>{`
              wistia-player[media-id='s8g2niw2w5']:not(:defined) { 
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/s8g2niw2w5/swatch'); 
              }
            `}</style>
            <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
              <wistia-player 
                media-id="s8g2niw2w5" 
                aspect="1.7777777777777777" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></wistia-player>
            </div>
          </div>

          <div className="mt-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Learn how citations boost your local visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Discover why consistent business information matters</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>See how we automate the entire process for you</span>
              </li>
            </ul>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

export default CitationsEducationScreen;  