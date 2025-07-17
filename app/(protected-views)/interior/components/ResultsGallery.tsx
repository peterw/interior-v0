"use client";

import React, { useState } from "react";
import { Download, Maximize2, X, Check, Sparkles, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Watermark } from "@/app/(public)/components/Watermark";
import { useAuth } from "@/contexts/auth-context";

interface ResultsGalleryProps {
  images: string[];
  onSelectForFinal?: (imageIndex: number) => void;
  isPreview?: boolean;
  selectedIndex?: number | null;
  onTweakDesign?: (imageIndex: number) => void;
}

export function ResultsGallery({ 
  images, 
  onSelectForFinal,
  isPreview = true,
  selectedIndex,
  onTweakDesign
}: ResultsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { user } = useAuth();
  
  const creditBalance = user?.subscription?.credit_balance || 0;

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `interior-design-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleSelectForFinal = (index: number) => {
    if (onSelectForFinal && creditBalance > 0) {
      onSelectForFinal(index);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "group relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer transition-all duration-300",
              selectedIndex === index && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => handleImageClick(image, index)}
          >
            <div className="relative">
              <img
                src={image}
                alt={`Design variation ${index + 1}`}
                className="w-full aspect-square object-cover"
              />
              
              {/* Watermark overlay for previews */}
              {isPreview && <Watermark />}
            </div>
            
            {/* Selection indicator */}
            {selectedIndex === index && (
              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                {isPreview && onSelectForFinal && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectForFinal(index);
                    }}
                    className="bg-white/90 hover:bg-white"
                    disabled={creditBalance === 0}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Select
                  </Button>
                )}
                {isPreview && onTweakDesign && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTweakDesign(index);
                    }}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
                {!isPreview && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                        setSelectedImageIndex(index);
                      }}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image, index);
                      }}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Design number */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Design {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen preview dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => {
        setSelectedImage(null);
        setSelectedImageIndex(null);
      }}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>Design Preview</DialogTitle>
            {isPreview && (
              <DialogDescription>
                Watermarked preview. Select to generate final version.
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="relative">
            <img
              src={selectedImage || ""}
              alt="Full size preview"
              className="w-full"
            />
            {isPreview && <Watermark />}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {isPreview && onSelectForFinal && selectedImageIndex !== null && (
                <Button
                  size="sm"
                  onClick={() => {
                    handleSelectForFinal(selectedImageIndex);
                    setSelectedImage(null);
                    setSelectedImageIndex(null);
                  }}
                  disabled={creditBalance === 0}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {creditBalance === 0 ? "No Credits" : "Get Final Design (1 Credit)"}
                </Button>
              )}
              {!isPreview && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    downloadImage(selectedImage || "", selectedImageIndex || 0);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download 4K
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}