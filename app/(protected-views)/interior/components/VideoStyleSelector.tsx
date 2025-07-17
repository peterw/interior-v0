"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Play, Sparkles, Zap, Film } from "lucide-react";

interface VideoStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  preview: string;
}

const videoStyles: VideoStyle[] = [
  {
    id: "smooth-transition",
    name: "Smooth Transition",
    description: "Elegant fade between before and after",
    icon: <Sparkles className="w-5 h-5" />,
    duration: "10 seconds",
    preview: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
  },
  {
    id: "split-screen",
    name: "Split Screen",
    description: "Side-by-side comparison with sliding reveal",
    icon: <Film className="w-5 h-5" />,
    duration: "15 seconds",
    preview: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop",
  },
  {
    id: "dynamic-reveal",
    name: "Dynamic Reveal",
    description: "Animated wipe effect with zoom",
    icon: <Zap className="w-5 h-5" />,
    duration: "12 seconds",
    preview: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop",
  },
];

interface VideoStyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

export function VideoStyleSelector({ selectedStyle, onStyleSelect }: VideoStyleSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Video Style</h3>
        <p className="text-gray-600">Select how your transformation will be presented</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {videoStyles.map((style) => (
          <Card
            key={style.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-lg",
              selectedStyle === style.id && "ring-2 ring-purple-600"
            )}
            onClick={() => onStyleSelect(style.id)}
          >
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden relative group">
              <img
                src={style.preview}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  {style.icon}
                </div>
                <div>
                  <h4 className="font-medium">{style.name}</h4>
                  <p className="text-xs text-gray-500">{style.duration}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}