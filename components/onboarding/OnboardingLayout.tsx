'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
  hideNextButton?: boolean;
  customActions?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextButtonText = 'Continue',
  nextButtonDisabled = false,
  hideNextButton = false,
  customActions
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed Header with Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {onBack && currentStep > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
            </div>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content with padding for fixed header */}
      <motion.div 
        className="flex-1 flex flex-col pt-24 pb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex-1 max-w-4xl w-full mx-auto px-6">
          {children}
        </div>
      </motion.div>

      {/* Fixed Footer with Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {currentStep === totalSteps && (
                <span className="flex items-center gap-2">
                  <span className="text-green-600">🎉</span>
                  Complete onboarding to earn 100 free credits!
                </span>
              )}
            </div>
            
            {customActions || (
              !hideNextButton && onNext && (
                <Button
                  onClick={onNext}
                  disabled={nextButtonDisabled}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium"
                >
                  {nextButtonText}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;