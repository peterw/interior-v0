"use client";

import { useState, useEffect } from "react";
import { UploadSection } from "./components/UploadSection";
import { StylePicker } from "./components/StylePicker";
import { ProcessingStepper } from "./components/ProcessingStepper";
import { SocialProof } from "./components/SocialProof";
import { TrustBadges } from "./components/TrustBadges";
import { SampleTransformations } from "./components/SampleTransformations";
import { FreeCreditsBanner } from "./components/FreeCreditsBanner";

export default function InteriorRedesignPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"upload" | "style" | "processing" | "result">("upload");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (uploadedImage && !selectedStyle) {
      setCurrentStep("style");
    } else if (uploadedImage && selectedStyle) {
      setCurrentStep("processing");
    }
  }, [uploadedImage, selectedStyle]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Integrated Stepper */}
      <div className="relative overflow-hidden bg-white border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-purple-50 opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          {/* Trust Headline */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted by 127,000+ homeowners
              </span>
              <span className="text-gray-400">•</span>
              <span>2.4M+ rooms transformed</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              See Your Space in a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Whole New Light
              </span>
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Transform any room in seconds. Upload, pick a style, watch magic happen.
            </p>
          </div>

          {/* Integrated Visual Stepper */}
          <ProcessingStepper currentStep={currentStep} hasImage={!!uploadedImage} hasStyle={!!selectedStyle} />
        </div>
      </div>

      {/* Free Credits Banner - Prominent placement */}
      <FreeCreditsBanner />

      {/* Main Content Area - Optimized for viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Progressive Disclosure Layout - Compact spacing */}
        <div className="space-y-6">
          {/* Step 1: Upload - Always visible and prominent */}
          <div className={`transition-all duration-500 ${currentStep === "upload" ? "scale-100" : "scale-98 opacity-90"}`}>
            <UploadSection
              onImageUpload={setUploadedImage}
              uploadedImage={uploadedImage}
              isActive={currentStep === "upload"}
            />
          </div>

          {/* Step 2: Style Selection - Only shown after upload */}
          {uploadedImage && (
            <div className={`transition-all duration-500 ${
              currentStep === "style" ? "opacity-100" : "opacity-90"
            }`}>
              <StylePicker
                onStyleSelect={setSelectedStyle}
                selectedStyle={selectedStyle}
                isActive={currentStep === "style"}
                uploadedImage={uploadedImage}
              />
            </div>
          )}

          {/* Processing/Result View */}
          {uploadedImage && selectedStyle && currentStep === "processing" && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-lg shadow-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="text-gray-700 font-medium">Transforming your space...</span>
              </div>
            </div>
          )}
        </div>

        {/* Social Proof Section - Below main flow */}
        {!uploadedImage && (
          <div className="mt-16">
            <SocialProof />
          </div>
        )}

        {/* Sample Transformations - For users who need inspiration */}
        {!uploadedImage && (
          <div className="mt-16">
            <SampleTransformations onTryExample={setUploadedImage} />
          </div>
        )}

        {/* Trust Badges - Bottom */}
        <div className="mt-16">
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}