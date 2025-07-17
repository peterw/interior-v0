import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, TrendingUp } from "lucide-react"

interface BetaAccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  description: string
  actionText?: string
  onAction?: () => void
  crispMessage?: string
}

export function BetaAccessModal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  actionText = "Get Access",
  onAction,
  crispMessage
}: BetaAccessModalProps) {
  const handleAction = () => {
    if (crispMessage && typeof window !== 'undefined' && (window as any).$crisp) {
      try {
        (window as any).$crisp.push(["do", "chat:open"]);
        (window as any).$crisp.push(["do", "message:send", ["text", crispMessage]]);
      } catch (error) {
        console.error('Failed to open Crisp chat:', error);
      }
    }
    
    if (onAction) {
      onAction()
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <div className="fixed left-1/2 top-1/2 z-[101] grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 border-none bg-transparent p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="relative bg-white rounded-lg overflow-hidden max-w-[90%] sm:max-w-md mx-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header with icon */}
            <div className="text-center pt-8 pb-6 px-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h2>
              
              <p className="text-sm text-gray-600 mb-4">
                {subtitle}
              </p>
              
              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Action button */}
            <div className="px-6 pb-6">
              <Button 
                onClick={handleAction}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
              >
                {actionText}
              </Button>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  )
} 