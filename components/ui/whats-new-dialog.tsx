"use client"

import React, { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles, Check } from "lucide-react"
import Link from "next/link"
import { useAnalytics } from "@/hooks/use-analytics"

interface WhatsNewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WhatsNewDialog({ open, onOpenChange }: WhatsNewDialogProps) {
  const analytics = useAnalytics();

  useEffect(() => {
    if (open) {
      analytics.track('whats_new_dialog_opened');
    }
  }, [analytics, open]);

  const handleFeatureClick = (feature: string, href: string) => {
    analytics.track('whats_new_feature_clicked', {
      feature,
      href,
      is_coming_soon: feature.includes('COMING SOON')
    });
    onOpenChange(false);
  };

  const handleWalkthroughClick = () => {
    analytics.track('whats_new_walkthrough_clicked', {
      video_url: 'https://www.youtube.com/watch?v=IrEhEQ9oSEk&'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white p-4 sm:p-6">
        <DialogHeader className="relative pb-3 sm:pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-2xl font-bold text-gray-900 flex items-baseline gap-2">
                  What's New
                  <span className="text-xs sm:text-sm text-gray-400 font-normal">June 27</span>
                </DialogTitle>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  Latest updates
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-1.5 py-3 sm:py-4">
          <Link 
            href="/citations" 
            className="group py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors flex gap-2 sm:gap-3"
            onClick={() => handleFeatureClick('Citations Expansion', '/citations')}
          >
            <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm mb-0.5 sm:mb-1 group-hover:text-gray-700 transition-colors">Citations Expansion</h4>
              <p className="text-xs text-gray-600">100+ new domains added</p>
            </div>
          </Link>

          <Link 
            href="/history" 
            className="group py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors flex gap-2 sm:gap-3"
            onClick={() => handleFeatureClick('Improved Scan History', '/history')}
          >
            <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm mb-0.5 sm:mb-1 group-hover:text-gray-700 transition-colors">Improved Scan History</h4>
              <p className="text-xs text-gray-600">Enhanced tracking tools</p>
            </div>
          </Link>

          <Link 
            href="/leads" 
            className="group py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors flex gap-2 sm:gap-3"
            onClick={() => handleFeatureClick('Local Leads Database', '/leads')}
          >
            <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm mb-0.5 sm:mb-1 group-hover:text-gray-700 transition-colors">Local Leads Database</h4>
              <p className="text-xs text-gray-600">Find clients by location</p>
            </div>
          </Link>

          <Link 
            href="/business" 
            className="group py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors flex gap-2 sm:gap-3"
            onClick={() => handleFeatureClick('Business Audit (COMING SOON)', '/business')}
          >
            <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-700 transition-colors">Business Audit</h4>
                <div className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  COMING SOON
                </div>
              </div>
              <p className="text-xs text-gray-600">Review and citation audits</p>
            </div>
          </Link>

          <Link 
            href="/review-booster" 
            className="group py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors flex gap-2 sm:gap-3"
            onClick={() => handleFeatureClick('Review Booster (COMING SOON)', '/review-booster')}
          >
            <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-700 transition-colors">Review Booster</h4>
                <div className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  COMING SOON
                </div>
              </div>
              <p className="text-xs text-gray-600">Automated review follow-ups</p>
            </div>
          </Link>
        </div>
        
        <div className="pt-3 sm:pt-4 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-3">
            Explore features above
          </p>
          <p className="text-xs text-gray-500 text-center">
            <a 
              href="https://www.youtube.com/watch?v=IrEhEQ9oSEk&" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
              onClick={handleWalkthroughClick}
            >
              Watch walkthrough
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
