"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { AuthenticationService } from "@/lib/api/generated";
import { useAnalytics } from "@/hooks/use-analytics";

export function TrialBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const analytics = useAnalytics();
  const pathname = usePathname();

  useEffect(() => {
    const checkTrialStatus = async () => {
      try {
        // Only show on dashboard route
        if (pathname !== '/dashboard') {
          setShowBanner(false);
          return;
        }

        const userData = await AuthenticationService.usersAuthMeRetrieve();
        
        // Don't show banner for premium users
        if (userData.is_premium) {
          setShowBanner(false);
          return;
        }
        
        if (userData.date_joined) {
          const joinDate = new Date(userData.date_joined);
          const now = new Date();
          const daysSinceJoining = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
          const trialDaysLeft = 7 - (daysSinceJoining % 7);
          
          // Show banner for non-premium users with repeating 7-day countdown
          setShowBanner(true);
          setDaysLeft(trialDaysLeft === 7 ? 7 : trialDaysLeft);
        } else {
          setShowBanner(false);
        }
      } catch (error) {
        console.error('Error checking trial status:', error);
        setShowBanner(false);
      }
    };

    checkTrialStatus();
  }, [pathname]);


  const handleUpgradeClick = () => {
    analytics.track('trial_banner_upgrade_clicked', {
      days_left: daysLeft,
      source: 'trial_banner'
    });
  };

  if (!showBanner) return null;

  return (
    <div className="w-full border-b border-blue-200 py-1.5 px-3 md:py-2 md:px-4 coupon-ticker-glow">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Clock className="h-2 w-2 md:h-3 md:w-3 text-blue-600" />
            </div>
            <span className="text-blue-700 text-xs md:text-sm leading-tight">
              <span className="hidden sm:inline">You have <strong className="font-bold">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong> left in your Advanced Trial - Upgrade now to continue accessing all premium features</span>
              <span className="sm:hidden"><strong className="font-bold">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong> left in trial - Upgrade now</span>
            </span>
          </div>
          <div className="flex-shrink-0">
            <Link href="/upgrade">
              <Button 
                size="sm"
                variant="secondary"
                className="bg-blue-50  text-blue-700 hover:bg-blue-100 border-blue-200 font-medium text-xs md:text-sm shadow-sm whitespace-nowrap  py-1 px-3 md:py-1.5 md:h-auto h-8"
                onClick={handleUpgradeClick}
              >
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Inject keyframe animations */}
      <style jsx global>{`
        .coupon-ticker-glow {
          background-image: linear-gradient(
            -45deg,
            #eff6ff,
            #dbeafe,
            #bfdbfe,
            #dbeafe,
            #eff6ff
          );
          background-size: 400% 400%;
          animation: glow-background 8s ease-in-out infinite;
        }

        @keyframes glow-background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}