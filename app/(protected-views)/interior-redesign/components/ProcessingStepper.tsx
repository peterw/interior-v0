"use client";

import { Check, Upload, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStepperProps {
  currentStep: "upload" | "style" | "processing" | "result";
  hasImage: boolean;
  hasStyle: boolean;
}

export function ProcessingStepper({ currentStep, hasImage, hasStyle }: ProcessingStepperProps) {
  const steps = [
    {
      id: "upload",
      label: "Upload Photo",
      icon: Upload,
      description: "Add your room image",
      isComplete: hasImage,
      isCurrent: currentStep === "upload",
    },
    {
      id: "style",
      label: "Choose Style",
      icon: Palette,
      description: "Select design aesthetic",
      isComplete: hasStyle,
      isCurrent: currentStep === "style",
    },
    {
      id: "transform",
      label: "Transform",
      icon: Sparkles,
      description: "AI magic happens",
      isComplete: currentStep === "result",
      isCurrent: currentStep === "processing",
    },
  ];

  return (
    <div className="relative">
      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step */}
            <div className={cn(
              "relative flex flex-col items-center group",
              step.isCurrent && "scale-110 transform transition-transform duration-300"
            )}>
              {/* Step Circle */}
              <div className={cn(
                "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
                step.isComplete
                  ? "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30"
                  : step.isCurrent
                  ? "bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 animate-pulse"
                  : "bg-gray-200 shadow-md"
              )}>
                {step.isComplete ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <step.icon className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    step.isCurrent ? "text-white" : "text-gray-500"
                  )} />
                )}
                
                {/* Active Ring Animation */}
                {step.isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-indigo-600 opacity-20" />
                )}
              </div>
              
              {/* Step Label */}
              <div className="absolute -bottom-8 text-center">
                <p className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  step.isComplete || step.isCurrent ? "text-gray-900" : "text-gray-500"
                )}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="relative w-24 lg:w-32 mx-4">
                <div className="absolute inset-0 flex items-center">
                  <div className={cn(
                    "h-1 w-full rounded-full transition-all duration-500",
                    steps[index + 1].isComplete || steps[index + 1].isCurrent
                      ? "bg-gradient-to-r from-green-500 to-indigo-600"
                      : "bg-gray-200"
                  )} />
                </div>
                
                {/* Progress Animation */}
                {step.isComplete && !steps[index + 1].isComplete && (
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-[slideRight_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1">
              <div className={cn(
                "relative h-2 rounded-full transition-all duration-300",
                index === 0 ? "rounded-l-full" : "",
                index === steps.length - 1 ? "rounded-r-full" : "",
                step.isComplete
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : step.isCurrent
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                  : "bg-gray-200"
              )} />
            </div>
          ))}
        </div>
        
        {/* Current Step Info */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Step {steps.findIndex(s => s.isCurrent) + 1} of {steps.length}: {steps.find(s => s.isCurrent)?.label}
          </p>
        </div>
      </div>
    </div>
  );
}