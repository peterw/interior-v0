"use client";

import React, { useState } from "react";
import { X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TweakModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewIndex: number;
  currentStyle: string;
  onSubmit: (tweakPrompt: string) => void;
}

export function TweakModal({
  isOpen,
  onClose,
  previewIndex,
  currentStyle,
  onSubmit,
}: TweakModalProps) {
  const [tweakPrompt, setTweakPrompt] = useState("");

  const handleSubmit = () => {
    if (tweakPrompt.trim()) {
      onSubmit(tweakPrompt);
      setTweakPrompt("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tweak Design {previewIndex + 1}</DialogTitle>
          <DialogDescription>
            Tell us how to improve this design
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="style" className="text-sm text-gray-600">
              Current Style
            </Label>
            <p className="mt-1 text-sm font-medium capitalize">
              {currentStyle.replace(/-/g, ' ')}
            </p>
          </div>
          
          <div>
            <Label htmlFor="tweak">Additional Instructions</Label>
            <Textarea
              id="tweak"
              placeholder="Add plants, brighten room, warm colors..."
              value={tweakPrompt}
              onChange={(e) => setTweakPrompt(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!tweakPrompt.trim()}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Apply Tweaks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}