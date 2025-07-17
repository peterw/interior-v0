"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { SimpleMaskCanvas } from "./components/SimpleMaskCanvas";
import { ImageSelector } from "./components/ImageSelector";
import { MaskTools } from "./components/MaskTools";
import { toast } from "@/components/hooks/use-toast";

// Mock history data - in production this would come from an API
const mockHistory = [
  {
    id: "1",
    transformedImage: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop",
    style: "Modern Minimalist",
    createdAt: "2024-01-20T14:30:00",
  },
  {
    id: "2", 
    transformedImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    style: "Cozy Scandinavian",
    createdAt: "2024-01-19T10:15:00",
  },
  {
    id: "3",
    transformedImage: "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=400&h=300&fit=crop",
    style: "Industrial Chic", 
    createdAt: "2024-01-18T16:45:00",
  },
];

export default function CanvasPage() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('image');
  const imageId = searchParams.get('id');
  
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUrl || mockHistory[0]?.transformedImage || null);
  const [currentImageId, setCurrentImageId] = useState<string | null>(imageId || mockHistory[0]?.id || null);
  const [tool] = useState<'brush' | 'eraser'>('brush'); // Always brush now
  const [brushSize, setBrushSize] = useState(30);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [canvasRef, setCanvasRef] = useState<any>(null);

  // Load image from URL params or default to first history item
  useEffect(() => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setCurrentImageId(imageId);
    } else if (mockHistory.length > 0 && !selectedImage) {
      setSelectedImage(mockHistory[0].transformedImage);
      setCurrentImageId(mockHistory[0].id);
    }
  }, [imageUrl, imageId]);

  const handleSelectImage = (image: string, id: string) => {
    setSelectedImage(image);
    setCurrentImageId(id);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !canvasRef) {
      toast({
        title: "Missing input",
        description: "Please draw a mask and describe what you want to change.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Get mask data from canvas
      const maskData = canvasRef.getMaskDataUrl();
      
      if (!maskData) {
        throw new Error('No mask data available');
      }

      // Simulate API call - in production this would call your backend
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Design generated!",
        description: "Your changes have been applied successfully.",
      });
      
      // Reset after generation
      setPrompt('');
      canvasRef.clearMask();
      
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate new design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!selectedImage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">No Image Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select an image from your history to start editing.
          </p>
          <Link href="/interior/history">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to History
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header - Ultra thin */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/interior/history">
              <Button variant="ghost" size="sm" className="h-8">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Canvas Editor</h1>
          </div>
        </div>
      </div>

      {/* Main Content - No scroll */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Image Selector */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Previous Designs</h3>
          <ImageSelector
            images={mockHistory}
            selectedId={currentImageId}
            onSelectImage={handleSelectImage}
          />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-gray-100 p-6">
          <SimpleMaskCanvas
            imageUrl={selectedImage}
            tool={tool}
            brushSize={brushSize}
            onCanvasReady={setCanvasRef}
          />
        </div>

        {/* Right Sidebar - Tools */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <MaskTools
            tool={tool}
            brushSize={brushSize}
            prompt={prompt}
            isGenerating={isGenerating}
            onToolChange={() => {}} // No-op since we only have brush
            onBrushSizeChange={setBrushSize}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            onClearMask={() => canvasRef?.clearMask()}
          />
        </div>
      </div>
    </div>
  );
}