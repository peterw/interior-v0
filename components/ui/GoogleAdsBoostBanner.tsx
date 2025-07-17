'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { cf } from "@/lib/cf"

interface GoogleAdsBoostBannerProps {
  businessId: string;
  businessName?: string;
  onBoostClick: () => void;
}

const GoogleAdsBoostBanner: React.FC<GoogleAdsBoostBannerProps> = ({
  businessId,
  businessName,
  onBoostClick
}) => {
  return (
    <div className="w-full mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start justify-center max-w-3xl mx-auto gap-0">
          <div className="w-52 sm:w-60 flex-shrink-0 flex items-end">
            <Image 
              src={cf("/images/boost/google-ads-boost.png")}
              alt="Google Ads Boost"
              width={200}
              height={150}
              priority
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 p-6 sm:p-8 text-white">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Get customers on {businessName || "Your Business"} on Auto-Pilot!</h3>
              </div>
              
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span>(100% DONE FOR YOU) We manage your Google Ads for you - no setup, no monitoring, no optimization needed. Weekly reports included.</span></div>
              </div>
              <Button 
                onClick={() => window.open('https://buy.stripe.com/cNi3cu3Np9uo36C9tb8Zq01', '_blank', 'noopener,noreferrer')}
                className="bg-white text-white hover:bg-gray-50 hover:text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-blue-200"
              >
                Preview $500/Month - 100% Done For You Google Ads for {businessName || "Your Business"}
              </Button>
              
              <div className="mt-2 inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">Only 3 slots left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsBoostBanner;
