"use client";

import { useState } from "react";
import Image from "next/image";
import { cf } from "@/lib/cf";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Sample {
  id: string;
  category: string;
  before: string;
  after: string;
  style: string;
  description: string;
}

const samples: Sample[] = [
  {
    id: "living-1",
    category: "Living Room",
    before: "/images/samples/living-before-1.jpg",
    after: "/images/samples/living-after-1.jpg",
    style: "Modern Minimalist",
    description: "Cluttered space transformed into a serene modern retreat",
  },
  {
    id: "bedroom-1",
    category: "Bedroom",
    before: "/images/samples/bedroom-before-1.jpg",
    after: "/images/samples/bedroom-after-1.jpg",
    style: "Scandinavian",
    description: "Dark bedroom brightened with Nordic design elements",
  },
  {
    id: "kitchen-1",
    category: "Kitchen",
    before: "/images/samples/kitchen-before-1.jpg",
    after: "/images/samples/kitchen-after-1.jpg",
    style: "Industrial Chic",
    description: "Outdated kitchen modernized with industrial touches",
  },
];

interface SampleTransformationsProps {
  onTryExample: (file: File) => void;
}

export function SampleTransformations({ onTryExample }: SampleTransformationsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShowingAfter, setIsShowingAfter] = useState(false);

  const activeSample = samples[activeIndex];

  const handleTryExample = async () => {
    try {
      // Convert the sample image to a File object
      const response = await fetch(cf(activeSample.before));
      
      if (!response.ok) {
        throw new Error(`Failed to load sample image: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const file = new File([blob], "sample-room.jpg", { type: "image/jpeg" });
      onTryExample(file);
    } catch (error) {
      console.error("Error loading sample image:", error);
      // Optionally show user-friendly error message
      alert("Unable to load sample image. Please try again.");
    }
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Not Sure Where to Start?{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Try These Examples
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See dramatic transformations instantly. Try any sample room.
        </p>
      </div>

      {/* Main Showcase */}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Comparison */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Before Image */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isShowingAfter ? "opacity-0" : "opacity-100"
              )}>
                <Image
                  src={cf(activeSample.before)}
                  alt="Before transformation"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  Before
                </div>
              </div>
              
              {/* After Image */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isShowingAfter ? "opacity-100" : "opacity-0"
              )}>
                <Image
                  src={cf(activeSample.after)}
                  alt="After transformation"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                  After • {activeSample.style}
                </div>
              </div>
              
              {/* Hover Toggle Button */}
              <button
                onMouseEnter={() => setIsShowingAfter(true)}
                onMouseLeave={() => setIsShowingAfter(false)}
                onClick={() => setIsShowingAfter(!isShowingAfter)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                  <Play className="w-8 h-8 text-indigo-600" />
                </div>
              </button>
            </div>
            
            {/* Navigation */}
            <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + samples.length) % samples.length)}
                className="pointer-events-auto p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % samples.length)}
                className="pointer-events-auto p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Description and CTA */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                {activeSample.category} Transformation
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{activeSample.description}</h3>
              <p className="text-gray-600">
                This {activeSample.category.toLowerCase()} was completely reimagined using our 
                {" "}<strong>{activeSample.style}</strong> preset. The AI automatically:
              </p>
              
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Adjusted lighting and color palette</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Rearranged furniture for better flow</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Added decorative elements and textures</span>
                </li>
              </ul>
            </div>
            
            {/* CTAs */}
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={handleTryExample}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try This Example
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
              >
                View More Examples
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sample Thumbnails */}
        <div className="flex justify-center gap-2 mt-8">
          {samples.map((sample, index) => (
            <button
              key={sample.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-20 h-16 rounded-lg overflow-hidden transition-all duration-300",
                activeIndex === index
                  ? "ring-2 ring-indigo-600 ring-offset-2 scale-110"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={cf(sample.before)}
                alt={`${sample.category} sample`}
                width={80}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}