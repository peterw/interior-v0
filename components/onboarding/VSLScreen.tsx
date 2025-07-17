'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import { Card } from '@/components/ui/card';

interface VSLScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const VSLScreen: React.FC<VSLScreenProps> = ({ onNext, onBack }) => {
  const [videoWatched, setVideoWatched] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Replace with actual VSL video URL
  const VSL_VIDEO_URL = "/videos/localrank-vsl.mp4"; // You'll need to add the actual video
  const VIDEO_DURATION_MINUTES = 5; // Adjust based on actual video length
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setWatchProgress(progress);
      
      // Mark as watched when user has watched at least 90% of the video
      if (progress >= 90 && !videoWatched) {
        setVideoWatched(true);
      }
    }
  };
  
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={10}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Continue"
      nextButtonDisabled={false}
    >
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 bg-blue-50 border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Learn How to Dominate Google Maps
          </h2>
          <p className="text-gray-600">
            Watch this optional video to see how LocalRank can help your business rank higher
          </p>
        </Card>

        <div className="mt-8 space-y-6">
          {/* Video Player */}
          <Card className="relative overflow-hidden bg-black aspect-video">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-900"
                onClick={handlePlayClick}
              >
                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 mb-4"
                  >
                    <Play className="h-6 w-6 mr-2" />
                    Watch Video ({VIDEO_DURATION_MINUTES} min)
                  </Button>
                  <p className="text-white/80 text-sm">
                    Optional training video
                  </p>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
              >
                <source src={VSL_VIDEO_URL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Card>

          {/* Progress Indicator */}
          {isPlaying && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Watch Progress</span>
                <span className="text-sm font-medium">
                  {Math.round(watchProgress)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${watchProgress}%` }}
                />
              </div>
              {watchProgress >= 90 && (
                <div className="mt-3 flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">
                    Video completed!
                  </span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </OnboardingLayout>
  );
};

export default VSLScreen;