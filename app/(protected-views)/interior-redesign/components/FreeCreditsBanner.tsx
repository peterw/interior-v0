"use client";

import { useState } from "react";
import { Gift, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FreeCreditsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Animated Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Content */}
            <div>
              <p className="font-semibold text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                Get 10 FREE Transformations Now!
              </p>
              <p className="text-sm text-white/90">
                No credit card required • Instant access • Premium styles included
              </p>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Claim Free Credits
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 translate-y-16" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12" />
    </div>
  );
}