"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
  completed: boolean;
}

interface ProgressBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps: Step[] = [
  { number: 1, label: "Upload Photo", completed: false },
  { number: 2, label: "Choose Style", completed: false },
  { number: 3, label: "AI Generation", completed: false },
  { number: 4, label: "Review & Edit", completed: false },
  { number: 5, label: "Share Results", completed: false },
];

export function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-16">
        <div className="py-6">
          <div className="flex items-center justify-center gap-2">
          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;
            const isClickable = step.number <= currentStep + 1 && (currentStep > 1 || step.number === 1);

            return (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={cn(
                    "group flex items-center gap-1.5",
                    isClickable && "cursor-pointer",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                      "border-2",
                      isCompleted && "border-black bg-black text-white shadow-md",
                      isActive && "border-black bg-white text-black shadow-md",
                      !isCompleted && !isActive && "border-gray-200 bg-white text-gray-400",
                      isClickable && !isActive && "group-hover:border-gray-300 group-hover:shadow-sm"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                      isActive && "text-black",
                      isCompleted && "text-gray-800",
                      !isCompleted && !isActive && "text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "w-12 md:w-20 h-0.5 mx-1 transition-all duration-300",
                      step.number < currentStep ? "bg-black" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}