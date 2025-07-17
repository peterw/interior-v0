"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";


export function useInteriorAI() {
  const { user } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maskDataUrl, setMaskDataUrl] = useState<string | null>(null);
  const [maskPrompt, setMaskPrompt] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [isGeneratingFinal, setIsGeneratingFinal] = useState(false);

  const handleImageUpload = useCallback((file: File | null, preview: string) => {
    if (!file) {
      setUploadedImage(null);
      setUploadedFile(null);
      setGeneratedImages([]);
      setSelectedStyle("");
      setMaskDataUrl(null);
      return;
    }
    setUploadedImage(preview);
    setUploadedFile(file);
    setError(null);
  }, []);

  const handleMaskComplete = useCallback((maskData: string, prompt: string) => {
    setMaskDataUrl(maskData);
    setMaskPrompt(prompt);
  }, []);

  const handleStyleSelect = useCallback((styleId: string) => {
    setSelectedStyle(styleId);
    setError(null);
  }, []);

  const handleGenerate = useCallback(() => {
    if (!uploadedFile || !selectedStyle) {
      setError("Please upload an image and select a style");
      return () => {}; // Return empty cleanup function for early exit
    }

    setIsGenerating(true);
    setError(null);

    // Create AbortController for this request
    const abortController = new AbortController();

    // Start the async operation
    (async () => {
      try {
        // Call the API route
        const formData = new FormData();
        formData.append("image", uploadedFile);
        formData.append("style", selectedStyle);
        if (maskDataUrl) {
          formData.append("mask", maskDataUrl);
        }
        if (maskPrompt) {
          formData.append("prompt", maskPrompt);
        }
        
        const response = await fetch("/interior/api/generate", {
          method: "POST",
          body: formData,
          signal: abortController.signal,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to generate designs");
        }
        
        // Update the uploaded image if we get the original back
        if (data.originalImage) {
          setUploadedImage(data.originalImage);
        }
        
        // Store preview images instead of final images
        setPreviewImages(data.images);
        setGeneratedImages([]); // Clear any previous final images
        // Store the share ID from the API response
        if (data.shareId) {
          setShareId(data.shareId);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Request was aborted, don't set error state
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to generate designs. Please try again.");
        console.error("Generation error:", err);
      } finally {
        setIsGenerating(false);
      }
    })();

    // Return cleanup function immediately to allow caller to abort
    return () => {
      abortController.abort();
    };
  }, [uploadedFile, selectedStyle, maskDataUrl, maskPrompt]);

  const handleExport = useCallback(
    (format: "single" | "all") => {
      if (format === "single" && generatedImages.length > 0) {
        // Export the first image by default
        const a = document.createElement("a");
        a.href = generatedImages[0];
        a.download = "interior-design-4k.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      // "all" export is handled in ExportOptions component
    },
    [generatedImages]
  );

  const handleShare = useCallback(() => {
    // Use the share ID from the API response
    if (!shareId) {
      console.error("No share ID available");
      return "";
    }
    
    const baseUrl = window.location.origin;
    const shareLink = `${baseUrl}/interior/share/${shareId}`;
    
    return shareLink;
  }, [shareId]);

  const handleSelectPreview = useCallback((index: number) => {
    setSelectedPreviewIndex(index);
  }, []);

  const handleGenerateFinal = useCallback(async () => {
    if (selectedPreviewIndex === null || !uploadedFile || !selectedStyle) {
      setError("Please select a preview design to generate final version");
      return;
    }

    const creditBalance = user?.subscription?.credit_balance || 0;
    if (creditBalance < 1) {
      setError("Insufficient credits. You need at least 1 credit to generate the final design.");
      return;
    }

    setIsGeneratingFinal(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);
      formData.append("selectedIndex", selectedPreviewIndex.toString());
      formData.append("isFinal", "true");
      if (maskDataUrl) {
        formData.append("mask", maskDataUrl);
      }
      if (maskPrompt) {
        formData.append("prompt", maskPrompt);
      }

      const response = await fetch("/interior/api/generate-final", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate final design");
      }

      // Set the final image without watermark
      setFinalImage(data.image);
      setGeneratedImages([data.image]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate final design");
      console.error("Final generation error:", err);
    } finally {
      setIsGeneratingFinal(false);
    }
  }, [selectedPreviewIndex, uploadedFile, selectedStyle, maskDataUrl, maskPrompt, user]);

  const [tweakModalOpen, setTweakModalOpen] = useState(false);
  const [tweakingIndex, setTweakingIndex] = useState<number | null>(null);

  const handleTweakDesign = useCallback((index: number) => {
    setTweakingIndex(index);
    setTweakModalOpen(true);
  }, []);

  const handleApplyTweak = useCallback(async (tweakPrompt: string) => {
    if (tweakingIndex === null || !uploadedFile || !selectedStyle) return;

    setIsGenerating(true);
    setError(null);
    setTweakModalOpen(false);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);
      formData.append("tweakPrompt", tweakPrompt);
      formData.append("tweakIndex", tweakingIndex.toString());
      
      const response = await fetch("/interior/api/generate", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate tweaked design");
      }
      
      // Replace the specific preview with the tweaked version
      const newPreviews = [...previewImages];
      if (data.images && data.images[0]) {
        newPreviews[tweakingIndex] = data.images[0];
        setPreviewImages(newPreviews);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to tweak design");
      console.error("Tweak error:", err);
    } finally {
      setIsGenerating(false);
      setTweakingIndex(null);
    }
  }, [tweakingIndex, uploadedFile, selectedStyle, previewImages]);

  return {
    uploadedImage,
    selectedStyle,
    generatedImages,
    isGenerating,
    error,
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
  };
}