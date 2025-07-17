'use client';

import React from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import { MapResultsWrapper } from '@/app/(public)/components/MapResultsWrapper';
import { KeywordDisplay } from '@/app/(public)/components/KeywordDisplay';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface BeforeAfterMapScreenProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  businessData?: {
    name: string;
    location?: { lat: number; lng: number };
    address?: string;
  };
}

const generateMockMapData = (businessName: string, keyword: string, rankingType: 'before' | 'after') => {
  const lat = 37.7749;
  const lng = -122.4194;
  
  const pins = [];
  const pinCount = 12;
  const radius = 0.05;
  
  for (let i = 0; i < pinCount; i++) {
    const angle = (i / pinCount) * 2 * Math.PI;
    const pinLat = lat + Math.cos(angle) * radius;
    const pinLng = lng + Math.sin(angle) * radius;
    
    let rank;
    if (rankingType === 'before') {
      rank = Math.floor(Math.random() * 11) + 10;
    } else {
      rank = Math.floor(Math.random() * 5) + 1;
    }
    
    pins.push({
      lat: pinLat,
      lng: pinLng,
      rank: rank,
      found: true,
      is_center: i === 0,
      error: null
    });
  }
  
  const avgRank = pins.reduce((sum, pin) => sum + pin.rank, 0) / pins.length;
  
  return {
    business_location: {
      lat: lat,
      lng: lng,
      name: businessName
    },
    keyword_results: [{
      term: keyword,
      avg_rank: avgRank,
      pins: pins,
      found: true
    }],
    completed_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
};

const BeforeAfterMapScreen: React.FC<BeforeAfterMapScreenProps> = ({ onNext, onBack, businessData }) => {
  const businessName = businessData?.name || 'Your Business';
  const keyword = `${businessName.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ')[0]} near me`;
  
  const beforeData = generateMockMapData(businessName, keyword, 'before');
  const afterData = generateMockMapData(businessName, keyword, 'after');

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={11}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="See How to Get These Results"
    >
      <div className="max-w-6xl mx-auto">
        <CharacterMessage
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Here's What LocalRank Can Do For {businessName} 🚀
              </h2>
              <p className="text-gray-600">
                See the dramatic difference in your local search rankings before and after using LocalRank
              </p>
            </>
          )}
          imageSize={64}
          imageAlt="Jacky Chou"
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before LocalRank */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-600 mb-2">Before LocalRank</h3>
              <p className="text-sm text-gray-600">Your current ranking situation</p>
              <div className="text-lg text-red-600 font-medium">
                Average Rank: {beforeData.keyword_results[0].avg_rank.toFixed(1)} 😞
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "400px" }}>
              <MapResultsWrapper
                scanDate={beforeData.completed_at}
                selectedKeyword={keyword}
                businessLocation={beforeData.business_location}
                keywordResults={beforeData.keyword_results}
              />
            </div>
          </div>

          {/* After LocalRank */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-600 mb-2">After LocalRank</h3>
              <p className="text-sm text-gray-600">Your potential with our platform</p>
              <div className="text-lg text-green-600 font-medium">
                Average Rank: {afterData.keyword_results[0].avg_rank.toFixed(1)} 🎉
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "400px" }}>
              <MapResultsWrapper
                scanDate={afterData.completed_at}
                selectedKeyword={keyword}
                businessLocation={afterData.business_location}
                keywordResults={afterData.keyword_results}
              />
            </div>
          </div>
        </div>

        {/* Improvement Arrow - positioned between maps */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>


      </div>
    </OnboardingLayout>
  );
};

export default BeforeAfterMapScreen;
