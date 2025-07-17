"use client";

import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Sparkles, Upload, Palette, Image, CheckCircle } from "lucide-react";

interface GenerationProgressProps {
  isGenerating: boolean;
  progress?: number;
}

export function GenerationProgress({ isGenerating, progress = 0 }: GenerationProgressProps) {
  if (!isGenerating) return null;

  const steps = [
    { icon: Upload, label: "Uploading image", progress: 25 },
    { icon: Palette, label: "Applying style", progress: 50 },
    { icon: Image, label: "Generating designs", progress: 75 },
    { icon: CheckCircle, label: "Finalizing", progress: 100 },
  ];

  const currentStep = steps.findIndex(step => step.progress > progress) || 0;

  return (
    <Card className="p-8 mb-8 backdrop-blur-sm bg-white/90 border border-gray-200/60 shadow-sm" style={{ borderRadius: '12px' }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
          <Sparkles className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">Generating Your Designs</h3>
          <p className="text-base text-gray-600">
            {steps[currentStep]?.label || "Processing..."}
          </p>
        </div>
      </div>

      <Progress value={progress} className="mb-6" />

      <div className="grid grid-cols-4 gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = progress >= step.progress;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 transition-all ${
                isComplete ? "text-blue-600" : isCurrent ? "text-gray-700" : "text-gray-400"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                  isComplete
                    ? "bg-blue-100"
                    : isCurrent
                    ? "bg-gray-100 animate-pulse"
                    : "bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-center font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-600 text-center mt-6 font-medium">
        Estimated time: less than 60 seconds
      </p>
    </Card>
  );
}