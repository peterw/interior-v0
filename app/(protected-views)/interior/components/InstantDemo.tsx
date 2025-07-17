"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const demoImages = {
  livingRoom: {
    before: "https://images.unsplash.com/photo-1486304873000-235643847519?w=800&h=600&fit=crop",
    after: {
      luxury: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      modern: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800&h=600&fit=crop",
      family: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    }
  },
  kitchen: {
    before: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
    after: {
      luxury: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      modern: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop",
      family: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop",
    }
  },
  bedroom: {
    before: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=800&h=600&fit=crop",
    after: {
      luxury: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      modern: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
      family: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop",
    }
  }
};

interface InstantDemoProps {
  onClose?: () => void;
}

export function InstantDemo({ onClose }: InstantDemoProps) {
  const [selectedRoom, setSelectedRoom] = useState<"livingRoom" | "kitchen" | "bedroom">("livingRoom");
  const [selectedStyle, setSelectedStyle] = useState<"luxury" | "modern" | "family">("luxury");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResult(false);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Try Instant Demo</h2>
        <p className="text-gray-600">Try without uploading. Pick room and style.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Room Selection */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">1. Choose Room Type</h3>
            <div className="grid grid-cols-3 gap-2">
              {(["livingRoom", "kitchen", "bedroom"] as const).map((room) => (
                <button
                  key={room}
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowResult(false);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedRoom === room 
                      ? "border-black bg-gray-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-sm font-medium capitalize">
                    {room === "livingRoom" ? "Living Room" : room === "kitchen" ? "Kitchen" : "Bedroom"}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Style Selection */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">2. Select Style</h3>
            <div className="space-y-2">
              {(["luxury", "modern", "family"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedStyle(style);
                    setShowResult(false);
                  }}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    selectedStyle === style 
                      ? "border-black bg-gray-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {style === "luxury" ? "Luxury Listing" : 
                         style === "modern" ? "Modern Professional" : 
                         "Family Friendly"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {style === "luxury" ? "High-end staging for premium properties" : 
                         style === "modern" ? "Appeals to young professionals" : 
                         "Warm spaces for families"}
                      </p>
                    </div>
                    {style === "luxury" && (
                      <Badge className="bg-gray-800 text-white">POPULAR</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Generate Button */}
          <Button 
            size="lg" 
            className="w-full bg-black hover:bg-gray-900 text-white"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Generating Demo...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Demo
              </>
            )}
          </Button>

          {showResult && (
            <Link href="/interior" className="block">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-black text-black hover:bg-gray-50"
              >
                Try With Your Own Photos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative">
              {!showResult ? (
                <>
                  <Badge className="absolute top-4 left-4 z-10 bg-gray-900 text-white">
                    Before
                  </Badge>
                  <img 
                    src={demoImages[selectedRoom].before}
                    alt="Before staging"
                    className="w-full h-[400px] object-cover"
                  />
                </>
              ) : (
                <>
                  <Badge className="absolute top-4 left-4 z-10 bg-black text-white">
                    After AI Staging
                  </Badge>
                  <img 
                    src={demoImages[selectedRoom].after[selectedStyle]}
                    alt="After staging"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      Virtual staging completed in 2 seconds!
                    </p>
                    <p className="text-xs text-gray-600">
                      Real transformations take just 30-60 seconds
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>

          {showResult && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-1.5 animate-pulse" />
                <div>
                  <p className="font-medium text-gray-900">Demo Complete!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Preview only. Upload photos for custom results.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}