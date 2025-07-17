'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';
import CharacterMessage from './CharacterMessage';

// Define the props interface - ensuring both onNext and onBack are included
interface OnboardingAchievementScreenProps {
  onNext: () => void;
  onBack: () => void; // Add onBack prop
}

// Reusing animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Update the component definition to use the interface and destructure both props
const OnboardingAchievementScreen: React.FC<OnboardingAchievementScreenProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6">
      <div className="w-full max-w-2xl flex-grow flex flex-col"> {/* Added flex-grow and flex-col */}
        {/* Back Arrow - Add the back button */}
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-4 self-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Progress Bar (Set to 2/6 = 33%) */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '33%' }}></div>
        </div>

        {/* Main Content Area - Animated */}
        <motion.div 
          className="flex-grow"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Character Message - Use the new component */}
          <CharacterMessage message="Here's what you can achieve!" />

          {/* Achievement List */}
          <div className="space-y-6">
            <div className="flex items-center">
              <MessageSquare className="h-10 w-10 text-purple-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Converse with confidence</h3>
                <p className="text-gray-500 text-sm">5,600+ stress-free interactive exercises</p>
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Build a large vocabulary</h3>
                <p className="text-gray-500 text-sm">2,200+ practical words and phrases</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-10 w-10 text-orange-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Develop a learning habit</h3>
                <p className="text-gray-500 text-sm">Smart reminders, fun challenges, and more</p>
              </div>
            </div>
          </div>
        </motion.div> {/* End animated content */}
      </div>

      {/* Divider and Continue Button - Animated */}
      <motion.div 
        className="w-full max-w-2xl mt-auto pt-6 border-t border-gray-200"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-end">
          <Button
            onClick={onNext}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 text-lg rounded-lg"
          >
            Continue
            </Button>
        </div>
      </motion.div> {/* End animated bottom section */}
    </div>
  );
};

export default OnboardingAchievementScreen; 