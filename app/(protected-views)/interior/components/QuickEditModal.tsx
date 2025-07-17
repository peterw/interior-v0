'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MaskingCanvasWithChat } from './MaskingCanvasWithChat';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSubmit: (maskDataUrl: string, prompt: string) => void;
}

export function QuickEditModal({ isOpen, onClose, imageUrl, onSubmit }: QuickEditModalProps) {
  const handleComplete = (maskDataUrl: string, prompt: string) => {
    onSubmit(maskDataUrl, prompt);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Specific Areas</DialogTitle>
        </DialogHeader>
        <MaskingCanvasWithChat
          imageUrl={imageUrl}
          onComplete={handleComplete}
        />
      </DialogContent>
    </Dialog>
  );
}