"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Paywall, PaywallStyle } from "@/components/ui/paywall";

interface WithPaywallProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  loomEmbedUrl?: string;
  ctaText?: string;
  secondaryText?: string;
  isActive?: boolean;
  redirectUrl?: string;
  style?: PaywallStyle;
}

export function WithPaywall({
  children,
  title = "Premium Feature Available",
  description = "Get access to all features with our premium plan. Watch this quick demo to see what you're missing.",
  loomEmbedUrl = "https://www.loom.com/embed/YOUR_LOOM_ID_HERE",
  ctaText = "Upgrade Now",
  secondaryText = "Maybe Later",
  isActive = true,
  redirectUrl = "/upgrade",
  style = "duolingo",
}: WithPaywallProps) {
  const router = useRouter();
  const [showPaywall, setShowPaywall] = useState(false);
  
  useEffect(() => {
    // Check if user should see paywall
    // This is just a placeholder - you should add your actual logic here
    // For example, check if user is premium, or has used their free quota
    if (isActive) {
      setShowPaywall(true);
    }
  }, [isActive]);

  const handleUpgrade = () => {
    router.push(redirectUrl);
  };

  const handleClose = () => {
    setShowPaywall(false);
  };

  return (
    <>
      <div className={showPaywall ? "filter blur-sm pointer-events-none" : ""}>
        {children}
      </div>
      
      {showPaywall && (
        <Paywall
          title={title}
          description={description}
          loomEmbedUrl={loomEmbedUrl}
          ctaText={ctaText}
          secondaryText={secondaryText}
          onCtaClick={handleUpgrade}
          onClose={handleClose}
          style={style}
        />
      )}
    </>
  );
} 