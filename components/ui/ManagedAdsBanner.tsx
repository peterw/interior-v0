'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { cf } from "@/lib/cf"


interface ManagedAdsBannerProps {
    businessId: string;
    business?: {
        business_details?: {
            name?: string;
        };
    };
    onClose: () => void;
}

const ManagedAdsBanner: React.FC<ManagedAdsBannerProps> = ({ businessId, business, onClose }) => {

    const handleCTAClick = () => {
        console.log(`Opening managed ads checkout for business: ${businessId}`);
        window.open('https://buy.stripe.com/cNi3cu3Np9uo36C9tb8Zq01', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="relative rounded-lg bg-blue-50 px-0 py-5 mb-4 shadow-md">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-blue-500 hover:bg-blue-100 hover:text-blue-700 z-10"
                onClick={onClose}
            >
                <X className="h-6 w-6" />
            </Button>

            <div className="flex flex-col sm:flex-row items-start justify-center max-w-3xl mx-auto gap-0">
                {/* Image of boost cards - reusing the same image */}
                <div className="w-52 sm:w-60 flex-shrink-0 flex items-end">
                    <Image 
                        src={cf("/images/boost/boost-cards.png")}
                        alt="Managed Ads Service"
                        width={200}
                        height={150}
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="w-[49%] my-2">
                    <div className="mb-4">
                        <h3 className="font-bold text-2xl text-blue-800">
                            Get Customers on {business?.business_details?.name || "Your Business"} on Auto-Pilot!
                        </h3>
                    </div>
                    
                    <ul className="space-y-1 text-sm text-blue-700">
                        <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>We manage your Google Ads for you (100% DONE FOR YOU)</span>
                        </li>
                    </ul>
                    
                    <div className="mt-4">
                        <Button
                            onClick={handleCTAClick}
                            className="bg-blue-700 text-white hover:bg-blue-800 font-semibold shadow-lg border border-blue-800 px-8 py-2.5 whitespace-nowrap"
                        >
                            Preview Google Ads for {business?.business_details?.name || "Your Business"}
                        </Button>
                    </div>
                    <div className="mt-2 text-xs">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-blue-700">Professional ad management service available now</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagedAdsBanner;
