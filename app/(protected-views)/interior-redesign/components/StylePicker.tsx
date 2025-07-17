"use client";

import { useState } from "react";
import Image from "next/image";
import { cf } from "@/lib/cf";
import { Check, Lock, Info, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Style {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

const styles: Style[] = [
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Clean lines, neutral colors, open spaces",
    preview: "/images/styles/modern.jpg",
    isPopular: true,
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    description: "Light woods, cozy textiles, hygge vibes",
    preview: "/images/styles/scandinavian.jpg",
    isPopular: true,
  },
  {
    id: "industrial",
    name: "Industrial Chic",
    description: "Exposed brick, metal fixtures, urban feel",
    preview: "/images/styles/industrial.jpg",
  },
  {
    id: "bohemian",
    name: "Bohemian",
    description: "Eclectic patterns, plants, warm colors",
    preview: "/images/styles/bohemian.jpg",
  },
  {
    id: "luxury",
    name: "Luxury Contemporary",
    description: "Premium materials, sophisticated palette",
    preview: "/images/styles/luxury.jpg",
    isPremium: true,
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    description: "Warm terracotta, arched doorways, tiles",
    preview: "/images/styles/mediterranean.jpg",
  },
  {
    id: "japandi",
    name: "Japandi",
    description: "Japanese minimalism meets Scandi comfort",
    preview: "/images/styles/japandi.jpg",
    isPopular: true,
  },
  {
    id: "art-deco",
    name: "Art Deco",
    description: "Bold geometry, rich colors, glamour",
    preview: "/images/styles/art-deco.jpg",
    isPremium: true,
  },
];

interface StylePickerProps {
  onStyleSelect: (styleId: string) => void;
  selectedStyle: string | null;
  isActive: boolean;
  uploadedImage: File | null;
}

export function StylePicker({ onStyleSelect, selectedStyle, isActive, uploadedImage }: StylePickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredStyles = styles.filter((style) =>
    style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    style.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (styleId: string) => {
    setFavorites((prev) =>
      prev.includes(styleId)
        ? prev.filter((id) => id !== styleId)
        : [...prev, styleId]
    );
  };

  return (
    <div className={`transition-all duration-500 flex flex-col h-[calc(100vh-320px)] ${!uploadedImage ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Section Header - Ultra thin */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              isActive ? "bg-indigo-600 text-white animate-pulse" : uploadedImage ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              2
            </span>
            Choose Your Design Style
          </h2>
          <p className="text-sm text-gray-600 ml-8">
            Select a style to transform instantly
          </p>
        </div>

        {/* Search and Filter - Compact */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 w-48 h-8 text-sm"
            />
          </div>
          
          <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
            <Heart className="w-3.5 h-3.5 mr-1" />
            Favorites ({favorites.length})
          </Button>
        </div>
      </div>

      {/* Style Grid - Scrollable container */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            onClick={() => !style.isPremium && onStyleSelect(style.id)}
            className={cn(
              "group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
              "hover:scale-105 hover:shadow-xl",
              selectedStyle === style.id && "ring-4 ring-indigo-600 ring-offset-2",
              style.isPremium && "opacity-75"
            )}
          >
            {/* Style Preview Image - Compact */}
            <div className="aspect-[4/3] relative bg-gray-100">
              <Image
                src={cf(style.preview)}
                alt={style.name}
                fill
                className="object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {style.isPopular && (
                  <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                    Popular
                  </span>
                )}
                {style.isPremium && (
                  <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(style.id);
                }}
                className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    favorites.includes(style.id) ? "fill-red-500 text-red-500" : "text-white"
                  )}
                />
              </button>
              
              {/* Selection Indicator */}
              {selectedStyle === style.id && (
                <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-2">
                    <Check className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              )}
              
              {/* Style Info - Compact */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-semibold text-sm mb-0.5">{style.name}</h3>
                <p className="text-white/80 text-xs line-clamp-1">{style.description}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Transform Button - Always visible at bottom */}
      <div className="mt-4 pt-4 border-t text-center">
        <Button
          size="lg"
          disabled={!selectedStyle}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-10 py-5 text-base rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 transition-all duration-300"
          >
          Transform My Room Now
          <span className="ml-2 animate-pulse">✨</span>
        </Button>
        
        <p className="mt-2 text-xs text-gray-500">
          <Info className="w-3 h-3 inline mr-1" />
          {selectedStyle ? "Processing takes about 30 seconds" : "Select a style to continue"}
        </p>
      </div>
    </div>
  );
}