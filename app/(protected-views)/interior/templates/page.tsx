"use client";

import { useState } from "react";
import { Sparkles, Lock, Crown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  isPro: boolean;
  isPopular: boolean;
  thumbnail: string;
  exampleImages: string[];
}

const templates: Template[] = [
  {
    id: "1",
    name: "Instant Modern Makeover",
    description: "Transform any room into a sleek, contemporary space",
    category: "modern",
    isPro: false,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=400&h=300&fit=crop",
    exampleImages: []
  },
  {
    id: "2",
    name: "Cozy Comfort Zone",
    description: "Create warm, inviting spaces perfect for relaxation",
    category: "cozy",
    isPro: false,
    isPopular: false,
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    exampleImages: []
  },
  {
    id: "3",
    name: "Industrial Edge",
    description: "Add urban sophistication with raw materials and bold design",
    category: "industrial",
    isPro: true,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    exampleImages: []
  },
  {
    id: "4",
    name: "Bohemian Paradise",
    description: "Express creativity with eclectic patterns and vibrant colors",
    category: "bohemian",
    isPro: true,
    isPopular: false,
    thumbnail: "https://images.unsplash.com/photo-1522444690501-325c0b5c0a8f?w=400&h=300&fit=crop",
    exampleImages: []
  },
  {
    id: "5",
    name: "Minimalist Zen",
    description: "Achieve tranquility through simplicity and clean lines",
    category: "modern",
    isPro: false,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop",
    exampleImages: []
  },
  {
    id: "6",
    name: "Luxury Suite",
    description: "Elevate your space with premium materials and elegant design",
    category: "luxury",
    isPro: true,
    isPopular: true,
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop",
    exampleImages: []
  }
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "modern", name: "Modern" },
    { id: "cozy", name: "Cozy" },
    { id: "industrial", name: "Industrial" },
    { id: "bohemian", name: "Bohemian" },
    { id: "luxury", name: "Luxury" }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            Design Templates
          </h1>
          <p className="text-gray-600 mt-2">
            Pre-configured styles for instant room transformations
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-white shadow-sm border">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {template.isPopular && (
                    <Badge className="bg-gray-800 text-white border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {template.isPro && (
                    <Badge className="bg-black text-white border-0">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </div>
                
                {/* Template Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">{template.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{template.description}</p>
                </div>
              </div>
              
              <CardContent className="p-4">
                <Button 
                  className={`w-full ${
                    template.isPro 
                      ? "bg-gray-800 hover:bg-gray-700 text-white" 
                      : "bg-black hover:bg-gray-900 text-white"
                  }`}
                  disabled={template.isPro}
                >
                  {template.isPro ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Upgrade to Pro
                    </>
                  ) : (
                    "Use Template"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pro Upgrade CTA */}
        <Card className="mt-12 border-0 shadow-lg bg-black text-white">
          <CardContent className="p-8 text-center">
            <Crown className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unlock All Pro Templates</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get access to exclusive design templates, advanced customization options, and priority processing
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

