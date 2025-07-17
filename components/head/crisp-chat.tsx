"use client"

import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { ChatboxPosition, ChatboxColors, Crisp } from "crisp-sdk-web";

// Use environment variable for Crisp website ID
const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

const CrispChat = () => {
  const pathname = usePathname();

  useEffect(() => {
    // List of paths where Crisp chat should not be displayed
    const ignoredPaths = ['/share/', '/learn', '/generate-socials', '/onboarding', '/review/collect'];
    // Check if the current path starts with any of the ignored paths
    const shouldExcludeCrisp = ignoredPaths.some(path => pathname?.startsWith(path));
    
    if (CRISP_WEBSITE_ID && !shouldExcludeCrisp) {
      Crisp.configure(CRISP_WEBSITE_ID);
      Crisp.setPosition("right" as ChatboxPosition);
      Crisp.setColorTheme("light_blue" as ChatboxColors);
    } else if (shouldExcludeCrisp && typeof window !== 'undefined' && (window as any).$crisp) {
      // Hide Crisp if it was previously initialized but now on an excluded page
      Crisp.chat.hide();
    }
  }, [pathname]);

  return null;
};

export default CrispChat;
