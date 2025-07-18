"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
}

// Placeholder gradient backgrounds for styles
const stylePlaceholders: Record<string, string> = {
  "modern-minimalist": "bg-gradient-to-br from-gray-100 to-gray-300",
  "cozy-scandinavian": "bg-gradient-to-br from-amber-50 to-amber-100",
  "luxury-modern": "bg-gradient-to-br from-slate-900 to-gray-700",
  "rustic-farmhouse": "bg-gradient-to-br from-amber-100 to-orange-200",
  "industrial-chic": "bg-gradient-to-br from-gray-700 to-gray-900",
  "bohemian-eclectic": "bg-gradient-to-br from-pink-200 to-purple-300",
  "classic-traditional": "bg-gradient-to-br from-amber-200 to-brown-300",
  "coastal-beach": "bg-gradient-to-br from-blue-100 to-cyan-200",
  "mid-century-modern": "bg-gradient-to-br from-orange-200 to-amber-300",
  "zen-japanese": "bg-gradient-to-br from-green-50 to-gray-200",
};

const designStyles: DesignStyle[] = [
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean lines and neutral colors",
    image: "",
    isPopular: true,
  },
  {
    id: "cozy-scandinavian",
    name: "Cozy Scandinavian",
    description: "Warm, hygge-inspired spaces",
    image: "",
    isPopular: true,
  },
  {
    id: "luxury-modern",
    name: "Luxury Modern",
    description: "High-end materials and sophisticated design",
    image: "",
    isNew: true,
    isPopular: true,
  },
  {
    id: "rustic-farmhouse",
    name: "Rustic Farmhouse",
    description: "Reclaimed wood and vintage charm",
    image: "",
  },
  {
    id: "industrial-chic",
    name: "Industrial Chic",
    description: "Exposed brick and metal fixtures",
    image: "",
  },
  {
    id: "bohemian-eclectic",
    name: "Bohemian Eclectic",
    description: "Colorful textiles and artistic decor",
    image: "",
  },
  {
    id: "classic-traditional",
    name: "Classic Traditional",
    description: "Timeless elegance and refined details",
    image: "",
  },
  {
    id: "coastal-beach",
    name: "Coastal Beach",
    description: "Light, airy, ocean-inspired",
    image: "",
    isNew: true,
  },
  {
    id: "mid-century-modern",
    name: "Mid-Century Modern",
    description: "Retro furniture and warm colors",
    image: "",
  },
  {
    id: "zen-japanese",
    name: "Zen Japanese",
    description: "Minimalist and peaceful atmosphere",
    image: "",
  },
];

interface StyleGridProps {
  selectedStyle?: string;
  onStyleSelect?: (styleId: string) => void;
  showAll?: boolean;
}

export function StyleGrid({ selectedStyle, onStyleSelect, showAll }: StyleGridProps) {
  const stylesToShow = showAll ? designStyles : designStyles.slice(0, 6);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {stylesToShow.map((style) => (
        <div
          key={style.id}
          onClick={() => onStyleSelect?.(style.id)}
          className={cn(
            "group relative rounded-xl overflow-hidden cursor-pointer transition-all bg-white/90 backdrop-blur-sm border-2",
            selectedStyle === style.id
              ? "border-gradient-to-r from-purple-500 to-pink-500 shadow-xl scale-[1.02]"
              : "border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-[1.01]"
          )}
        >
          {/* Style placeholder background */}
          <div className={cn(
            "aspect-[4/3] w-full",
            stylePlaceholders[style.id] || "bg-gradient-to-br from-gray-200 to-gray-400"
          )}>
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent">
            {/* Badges */}
            <div className="flex justify-between items-start">
              <div className="flex gap-1.5">
                {style.isNew && (
                  <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium">
                    NEW
                  </span>
                )}
                {style.isPopular && (
                  <span className="bg-purple-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium">
                    POPULAR
                  </span>
                )}
              </div>
              {selectedStyle === style.id && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 shadow-lg">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>

            {/* Style info */}
            <div className="text-white">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1 drop-shadow-lg">
                {style.name}
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm opacity-90 drop-shadow-md line-clamp-2">
                {style.description}
              </p>
            </div>
          </div>

          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity",
            selectedStyle === style.id ? "opacity-100" : "group-hover:opacity-100"
          )} />
        </div>
      ))}
    </div>
  );
}