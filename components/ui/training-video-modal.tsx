"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TrainingVideoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrainingVideoModal({ open, onOpenChange }: TrainingVideoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden border-0 shadow-2xl bg-white p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Watch Training Video
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-4">
          <div className="aspect-video w-full">
            <iframe
              src="https://share.descript.com/embed/4G1kEFON7Dc"
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="LocalRank Training Video"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
