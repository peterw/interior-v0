'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Zap, Check, X } from 'lucide-react';
import { fetchOneTimePurchases } from '@/lib/server-actions/citations';
import { format, addHours } from 'date-fns';
import Image from 'next/image';
import axios from '@/lib/axios';
import { cf } from "@/lib/cf"

interface BoostBannerProps {
    businessId: string;
    business?: {
        created_at?: string;
        business_details?: {
            name?: string;
        };
    };
    onBoostClick: () => void;
}

const BoostBanner: React.FC<BoostBannerProps> = ({ businessId, business, onBoostClick }) => {
    const [[minutes, seconds], setTime] = useState([0, 0]);
    const [isVisible, setIsVisible] = useState(true);
    const [isPurchased, setIsPurchased] = useState(false);
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<Date | null>(null);
    const [totalCitations, setTotalCitations] = useState<number>(2312); // Default fallback number
    const [isCitationsLoading, setIsCitationsLoading] = useState<boolean>(true);
    const [citationsError, setCitationsError] = useState<boolean>(false);
    
    const pulseAnimation = `
      @keyframes green-pulse {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
      }
      
      .green-pulse-indicator {
        animation: green-pulse 2s infinite;
        background-color: #10b981;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
    `;

    useEffect(() => {
        const fetchTotalCitations = async () => {
            try {
                setIsCitationsLoading(true);
                const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                const response = await axios.get(`${BACKEND_API_URL}/citations/total-citations/`);
                console.log('Total citations API response:', response.data);
                if (response.data && response.data.total_citations) {
                    setTotalCitations(response.data.total_citations);
                }
                setCitationsError(false);
            } catch (err) {
                console.error('Error fetching total citations:', err);
                setCitationsError(true);
            } finally {
                setIsCitationsLoading(false);
            }
        };

        fetchTotalCitations();
    }, []);

    useEffect(() => {
        const calculateRemainingTime = (): [number, number] => {
            let remainingTimeMs;
            
            if (business?.created_at) {
                const createdAtTimestamp = new Date(business.created_at).getTime();
                const currentTime = Date.now();
                const elapsedTimeMs = currentTime - createdAtTimestamp;
                
                const hoursElapsed = Math.floor(elapsedTimeMs / (60 * 60 * 1000));
                
                const msInCurrentHour = elapsedTimeMs % (60 * 60 * 1000);
                
                remainingTimeMs = Math.max(60 * 60 * 1000 - msInCurrentHour, 0);
            } else {
                remainingTimeMs = 60 * 60 * 1000;
            }
            
            const initialMinutes = Math.floor(remainingTimeMs / (60 * 1000));
            const initialSeconds = Math.floor((remainingTimeMs % (60 * 1000)) / 1000);
            return [initialMinutes, initialSeconds] as [number, number];
        };
        
        setTime(calculateRemainingTime());

        const intervalId = setInterval(() => {
            setTime(prevTime => {
                const [m, s] = prevTime;
                if (m === 0 && s === 0) {
                    return calculateRemainingTime();
                }
                if (s === 0) {
                    return [m - 1, 59];
                }
                return [m, s - 1];
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [business?.created_at]);

    useEffect(() => {
        if (!businessId) return;

        const checkPurchasedBoost = async () => {
            try {
                const purchases = await fetchOneTimePurchases();
                const purchasesData = Array.isArray(purchases) ? purchases : 
                                    (purchases && 'results' in purchases) ? purchases.results : [];

                const boostPurchase = purchasesData.find((purchase: any) => 
                    purchase.business_uuid === businessId
                );

                if (boostPurchase) {
                    setIsPurchased(true);
                    const purchaseDate = new Date(boostPurchase.created_at);
                    const deliveryDate = addHours(purchaseDate, 60);
                    setEstimatedDeliveryDate(deliveryDate);
                }
            } catch (err) {
                console.error('Error checking purchased boosts:', err);
            }
        };

        checkPurchasedBoost();
    }, [businessId]);

    const isTimeUp = minutes === 0 && seconds === 0;

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`relative rounded-lg ${isPurchased ? 'bg-blue-100' : 'bg-blue-50'} pt-2 px-0 pb-0 mb-4 shadow-md`}>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-blue-500 hover:bg-blue-100 hover:text-blue-700 z-10"
                onClick={() => setIsVisible(false)}
            >
                <X className="h-6 w-6" />
            </Button>

            <div className="flex flex-col sm:flex-row items-start justify-center max-w-3xl mx-auto gap-0">
                {/* Image of boost cards - touching the edge */}
                <div className="w-52 sm:w-60 flex-shrink-0 flex items-end">
                    <Image 
                        src={cf("/images/boost/boost-cards.png")}
                        alt="300 Boost Cards"
                        width={200}
                        height={150}
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="w-[49%] my-2">
                    <style dangerouslySetInnerHTML={{ __html: pulseAnimation }} />
                    <div className="mb-4">
                        <h3 className="font-bold text-2xl text-blue-800">
                          {isPurchased 
                            ? (<>Your Local Boost for {business?.business_details?.name || "this Business"} is <span className="text-yellow-500">on the way!</span></>) 
                            : `Boost ${business?.business_details?.name || "this Business"}!`}
                        </h3>
                    </div>
                    {!isPurchased ? (
                        <>
                            <ul className="space-y-1 text-sm text-blue-700">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Boost existing citations with our indexing service</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Add up to 500 additional 3rd-party citations.</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Submissions go live within 48-72 hours.</span>
                                </li>
                            </ul>
                            <div className="mt-4">
                                <Button
                                    onClick={onBoostClick}
                                    disabled={isTimeUp}
                                    className="bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-sm px-8 py-2.5 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                                > Boost Now!
                                </Button>
                            </div>
                            <div className="mt-2 text-xs">
                                <span className="green-pulse-indicator"></span>
                                <span className="text-gray-600 font-bold">
                                    {isCitationsLoading ? 'Loading...' : citationsError ? '86' : totalCitations.toLocaleString()}
                                </span>
                                <span className="text-blue-700 ml-1">citations created.</span>
                            </div>
                        </>
                    ) : estimatedDeliveryDate && (
                        <>
                            <p className="text-sm text-blue-700 mb-3">
                                The LocalRank team is working to fulfill your order of 300 links and indexing all your links. If you have any questions, feel free to reach out (bottom right.)
                            </p>
                            <div className="flex items-start mt-3 text-blue-700 font-medium">
                                <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Estimated completion: {format(estimatedDeliveryDate, 'MMM d, yyyy')}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoostBanner;
