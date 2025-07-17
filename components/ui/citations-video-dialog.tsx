'use client';

import React from 'react';
import Script from 'next/script';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CitationsVideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CitationsVideoDialog({ isOpen, onClose }: CitationsVideoDialogProps) {
  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      <Script src="https://fast.wistia.com/embed/s8g2niw2w5.js" strategy="lazyOnload" type="module" />
      
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-4xl">
          <div className="relative w-full aspect-video">
            <style jsx>{`
              wistia-player[media-id='s8g2niw2w5']:not(:defined) { 
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/s8g2niw2w5/swatch'); 
              }
            `}</style>
            <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
              <wistia-player 
                media-id="s8g2niw2w5" 
                aspect="1.7777777777777777" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></wistia-player>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 