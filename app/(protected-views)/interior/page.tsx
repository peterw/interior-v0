"use client";

import { useReducer, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Home, Sparkles, Download, Paintbrush, Share2, Copy, CheckCircle, Palette, Plus } from "lucide-react";
import { ImageUploader } from "./components/ImageUploader";
import { StyleGrid } from "./components/StyleGrid";
import { ResultsGallery } from "./components/ResultsGallery";
import { BeforeAfter } from "./components/BeforeAfter";
import { ExportOptions } from "./components/ExportOptions";
import { GenerationProgress } from "./components/GenerationProgress";
import { ProgressBar } from "./components/ProgressBar";
import { MaskingCanvasWithChat } from "./components/MaskingCanvasWithChat";
import { QuickEditModal } from "./components/QuickEditModal";
import { CustomStyleUpload } from "./components/CustomStyleUpload";
import { Input } from "@/components/ui/input";
import { useInteriorAI } from "./logic/useInteriorAI";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CreditDisplay } from "./components/CreditDisplay";
import { TweakModal } from "./components/TweakModal";
import { WelcomeHero } from "./components/WelcomeHero";
import { toast } from "@/components/hooks/use-toast";

interface AppState {
  currentStep: number;
  showEditModal: boolean;
  editedImage: string | null;
  portalLink: string | null;
  showWelcome: boolean;
}

type AppAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SHOW_EDIT_MODAL'; payload: boolean }
  | { type: 'SET_EDITED_IMAGE'; payload: string | null }
  | { type: 'SET_PORTAL_LINK'; payload: string | null }
  | { type: 'SET_SHOW_WELCOME'; payload: boolean };

const initialState: AppState = {
  currentStep: 1,
  showEditModal: false,
  editedImage: null,
  portalLink: null,
  showWelcome: true,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 5) };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case 'SHOW_EDIT_MODAL':
      return { ...state, showEditModal: action.payload };
    case 'SET_EDITED_IMAGE':
      return { ...state, editedImage: action.payload };
    case 'SET_PORTAL_LINK':
      return { ...state, portalLink: action.payload };
    case 'SET_SHOW_WELCOME':
      return { ...state, showWelcome: action.payload };
    default:
      return state;
  }
}

export default function InteriorAIPage() {
  const {
    uploadedImage,
    selectedStyle,
    generatedImages,
    isGenerating,
    maskDataUrl,
    maskPrompt,
    previewImages,
    selectedPreviewIndex,
    finalImage,
    isGeneratingFinal,
    handleImageUpload,
    handleMaskComplete,
    handleStyleSelect,
    handleGenerate,
    handleExport,
    handleShare,
    handleSelectPreview,
    handleGenerateFinal,
    handleTweakDesign,
    handleApplyTweak,
    tweakModalOpen,
    setTweakModalOpen,
    tweakingIndex,
  } = useInteriorAI();

  const [state, dispatch] = useReducer(appReducer, initialState);
  const { currentStep, showEditModal, editedImage, portalLink, showWelcome } = state;
  const [showCustomStyleUpload, setShowCustomStyleUpload] = useState(false);
  
  // Auto-advance to next step when generation completes
  useEffect(() => {
    if (currentStep === 2 && previewImages.length > 0 && !isGenerating) {
      dispatch({ type: 'NEXT_STEP' });
    }
  }, [currentStep, previewImages.length, isGenerating]);

  // Navigation handlers
  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!uploadedImage;
      case 2: return !!selectedStyle;
      case 3: return previewImages.length > 0 || generatedImages.length > 0;
      case 4: return previewImages.length > 0 || generatedImages.length > 0;
      case 5: return !!portalLink;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep === 2) {
      // Generate after style selection
      handleGenerate();
      // The hook will handle state updates, we'll check for completion in useEffect
    } else if (currentStep < 5) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handleEdit = (maskData: string, prompt: string) => {
    handleMaskComplete(maskData, prompt);
    // In production, this would regenerate with mask
    dispatch({ type: 'SET_EDITED_IMAGE', payload: generatedImages[0] }); // Mock for now
    dispatch({ type: 'SHOW_EDIT_MODAL', payload: false });
  };

  const handleCreatePortal = () => {
    const link = handleShare();
    if (link) {
      dispatch({ type: 'SET_PORTAL_LINK', payload: link });
      toast({
        title: "Share link created!",
        description: "Your client can now view and comment on the designs.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create share link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch({ type: 'PREV_STEP' });
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow clicking on completed steps
    if (step === 1 || (step === 2 && uploadedImage) || (step > 2 && (previewImages.length > 0 || generatedImages.length > 0))) {
      dispatch({ type: 'SET_STEP', payload: step });
    }
  };

  const copyShareLink = () => {
    if (portalLink) {
      navigator.clipboard.writeText(portalLink);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard.",
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="h-screen bg-white overflow-hidden">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
      
      {/* Credit Display */}
      <div className="absolute top-24 right-16">
        <CreditDisplay />
      </div>

      {/* Main Content */}
      <div className="h-full flex flex-col px-32 py-4 pt-24">

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="min-h-full flex items-center justify-center py-8">
          {currentStep === 1 && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Upload your room photo</h2>
                <p className="text-base text-gray-500">Transform any room instantly</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200">
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="w-full max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Choose a style</h2>
                <p className="text-base text-gray-500">Pick a design style for your room</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
                {/* Custom Style Button */}
                <div className="flex justify-end mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowCustomStyleUpload(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Custom Style
                  </Button>
                </div>
                
                <StyleGrid
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleSelect}
                />
              </div>
              
              {/* Custom Style Upload Modal */}
              <CustomStyleUpload
                open={showCustomStyleUpload}
                onOpenChange={setShowCustomStyleUpload}
                onStyleCreated={(styleId) => {
                  handleStyleSelect(styleId);
                  setShowCustomStyleUpload(false);
                }}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Generating designs</h2>
                <p className="text-base text-gray-500">AI is transforming your room</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <GenerationProgress isGenerating={isGenerating} />
                {previewImages.length > 0 && (
                  <div className="text-center mt-8">
                    <div className="inline-flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm">4 designs ready</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="w-full max-w-6xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Review your designs</h2>
                <p className="text-base text-gray-500">Select and download your favorite transformations</p>
              </div>
                
                {(previewImages.length > 0 || generatedImages.length > 0) && uploadedImage && (
                  <>
                    {/* Show preview gallery if no final image yet */}
                    {!finalImage && previewImages.length > 0 && (
                      <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <ResultsGallery 
                          images={previewImages}
                          isPreview={true}
                          onSelectForFinal={handleSelectPreview}
                          selectedIndex={selectedPreviewIndex}
                          onTweakDesign={handleTweakDesign}
                        />
                        {selectedPreviewIndex !== null && (
                          <div className="flex justify-center mt-8">
                            <Button
                              onClick={handleGenerateFinal}
                              disabled={isGeneratingFinal}
                              className="bg-gray-900 hover:bg-gray-800 text-white px-8"
                            >
                              {isGeneratingFinal ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Get HD Version (1 Credit)
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Show final results if available */}
                    {finalImage && generatedImages.length > 0 && (
                      <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <div className="grid grid-cols-2 gap-8 mb-8">
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Before</p>
                            <div className="relative aspect-[4/3]">
                              <Image 
                                src={uploadedImage} 
                                alt="Before" 
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-2">After</p>
                            <div className="relative aspect-[4/3]">
                              <Image 
                                src={generatedImages[0]} 
                                alt="After" 
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4">
                          <Button
                            variant="outline"
                            onClick={() => dispatch({ type: 'SHOW_EDIT_MODAL', payload: true })}
                            className="border-gray-300 hover:border-gray-400"
                          >
                            <Paintbrush className="h-4 w-4 mr-2" />
                            Edit Areas
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => window.open(`/interior/canvas?image=${encodeURIComponent(generatedImages[0])}&id=current`, '_blank')}
                            className="border-gray-300 hover:border-gray-400"
                          >
                            <Palette className="h-4 w-4 mr-2" />
                            Canvas Editor
                          </Button>
                          <Button
                            onClick={() => handleExport("single")}
                            className="bg-gray-900 hover:bg-gray-800 text-white"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Share with client</h2>
                <p className="text-base text-gray-500">Create a link for client review and feedback</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                {!portalLink ? (
                  <div className="text-center">
                    <Button
                      onClick={handleCreatePortal}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-8"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Create Share Link
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="flex gap-2">
                      <Input
                        value={portalLink}
                        readOnly
                        className="font-mono text-sm"
                        onClick={(e) => e.currentTarget.select()}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyShareLink}
                        className="shrink-0 border-gray-300 hover:border-gray-400"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Link copied. Share with your client for feedback.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-4 px-8 py-6 bg-gray-50 rounded-xl shadow-sm flex-shrink-0">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="text-gray-600 hover:text-gray-900 min-w-[140px]"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>

          <div className="text-base font-medium text-gray-700">
            Step {currentStep} of 5
          </div>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed() || currentStep === 5 || isGenerating}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 min-w-[140px]"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Generating...
              </>
            ) : currentStep === 5 ? (
              <>
                Complete
                <CheckCircle className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <QuickEditModal
        isOpen={showEditModal}
        onClose={() => dispatch({ type: 'SHOW_EDIT_MODAL', payload: false })}
        imageUrl={finalImage || generatedImages[0] || previewImages[0] || ''}
        onSubmit={handleEdit}
      />
      
      {/* Tweak Modal */}
      <TweakModal
        isOpen={tweakModalOpen}
        onClose={() => setTweakModalOpen(false)}
        previewIndex={tweakingIndex || 0}
        currentStyle={selectedStyle}
        onSubmit={handleApplyTweak}
      />
      </div>
    </ErrorBoundary>
  );
}
// Trigger CI rebuild - v2
