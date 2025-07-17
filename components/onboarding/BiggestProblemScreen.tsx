'use client';

import React, { useState } from 'react';
import OnboardingLayout from './OnboardingLayout';
import CharacterMessage from './CharacterMessage';
import { Search, Activity, Users } from 'lucide-react';

interface BiggestProblemScreenProps {
  onNext: (data: { biggestProblem: string }) => void;
  onBack: () => void;
}

const BiggestProblemScreen: React.FC<BiggestProblemScreenProps> = ({ onNext, onBack }) => {
  const [selectedProblem, setSelectedProblem] = useState<string>('cant_rank_high');

  const problems = [
    {
      id: 'cant_rank_high',
      text: <>
        <strong>Ranking on Google:</strong> I'm struggling to get my website to appear on the first page of Google search results.
      </>,
      Icon: Search
    },
    {
      id: 'issues_tracking',
      text: <>
        <strong>Tracking my rankings:</strong> I find it difficult to accurately track how my SEO efforts are performing.
      </>,
      Icon: Activity
    },
    {
      id: 'getting_customers',
      text: <>
        <strong>Low Revenue:</strong> I need help turning website visitors into actual paying customers.
      </>,
      Icon: Users
    },
  ];

  const handleSelectProblem = (problemId: string) => {
    setSelectedProblem(problemId);
  };

  const handleNextClick = () => {
    onNext({ biggestProblem: selectedProblem });
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={11}
      onNext={handleNextClick}
      onBack={onBack}
      nextButtonDisabled={!selectedProblem}
    >
      <div className="max-w-3xl mx-auto">
        <CharacterMessage
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                What's Your Biggest Challenge? 🤔
              </h2>
              <p className="text-gray-600">
                Let's figure out how we can help you most
              </p>
            </>
          )}
          imageSize={64}
          imageAlt="Jacky Chou"
        />

        <div className="space-y-4 my-8">
          {problems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => handleSelectProblem(problem.id)}
              className={`w-full p-4 border rounded-lg text-left transition-colors duration-200 flex items-center space-x-4 ${
                selectedProblem === problem.id
                  ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <problem.Icon className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-gray-800 text-base">{problem.text}</span>
            </button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BiggestProblemScreen;
