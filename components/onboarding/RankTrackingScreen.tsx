'use client';

import React from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import Script from 'next/script';

interface RankTrackingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const RankTrackingScreen: React.FC<RankTrackingScreenProps> = ({ onNext, onBack }) => {
  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      <Script src="https://fast.wistia.com/embed/sfcodlc47u.js" strategy="lazyOnload" type="module" />
      
      <OnboardingLayout
        currentStep={9}
        totalSteps={11}
        onNext={onNext}
        onBack={onBack}
      >
        <div className="max-w-3xl mx-auto">
          <CharacterMessage
            message={(
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Track Your Local Rankings Easily
                </h2>
                <p className="text-gray-600">
                  Monitor your Google Maps rankings and stay ahead of competition
                </p>
              </>
            )}
            imageSize={64}
            imageAlt="Jacky Chou"
          />

          <div className="relative w-full aspect-video mb-8">
            <style jsx>{`
              wistia-player[media-id='sfcodlc47u']:not(:defined) { 
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/sfcodlc47u/swatch'); 
              }
            `}</style>
            <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
              <wistia-player 
                media-id="sfcodlc47u" 
                aspect="1.7777777777777777" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></wistia-player>
            </div>
          </div>

          <div className="mt-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Daily rank tracking for your important keywords</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Track multiple locations and service areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Monitor competitor rankings and performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Beautiful, easy-to-understand reports</span>
              </li>
            </ul>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

export default RankTrackingScreen;  