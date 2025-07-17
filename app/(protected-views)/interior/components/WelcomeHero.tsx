"use client";

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeHeroProps {
  onGetStarted: () => void;
  hasSeenBefore?: boolean;
}

export function WelcomeHero({ onGetStarted, hasSeenBefore = false }: WelcomeHeroProps) {
  const [showWelcome, setShowWelcome] = useState(!hasSeenBefore);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user has opted out of welcome screen
    const hideWelcome = localStorage.getItem('hideInteriorWelcome');
    if (hideWelcome === 'true') {
      setShowWelcome(false);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideInteriorWelcome', 'true');
    }
    setShowWelcome(false);
  };

  const handleGetStarted = () => {
    handleClose();
    onGetStarted();
  };

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transform Any Room in Seconds
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Use AI to reimagine your space with different styles, furniture, and decor
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Design Styles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">30s</div>
              <div className="text-sm text-gray-600">Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">HD</div>
              <div className="text-sm text-gray-600">Quality Output</div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <label className="flex items-center justify-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded text-purple-600"
              />
              Don't show this again
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}