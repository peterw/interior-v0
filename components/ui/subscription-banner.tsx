"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/use-analytics';

interface SubscriptionBannerProps {
  message?: string;
  tab?: string;
}

export function SubscriptionBanner({ message = "Want to upload 10+ videos? Need to add more users? Upgrade your plan!", tab }: SubscriptionBannerProps) {
  const href = tab ? `/upgrade?tab=${tab}` : '/upgrade';
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.track('subscription_banner_viewed', {
      message,
      tab: tab || 'default',
      location: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
  }, [analytics, message, tab]);

  const handleUpgradeClick = () => {
    analytics.track('subscription_banner_upgrade_clicked', {
      message,
      tab: tab || 'default',
      location: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
  };
  
  return (
    <div className="w-full bg-blue-500 text-white px-4 py-3 sm:py-2">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Flag className="h-4 w-4 hidden sm:block" />
          <span className="text-sm font-medium">{message}</span>
        </div>
        <Link href={href} onClick={handleUpgradeClick}>
          <div className="px-6 py-1.5 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 border border-white hover:border-blue-100 transition-colors rounded-full text-sm font-medium">
            Upgrade
          </div>
        </Link>
      </div>
    </div>
  );
}                