"use client";

import React, { useState } from "react";
import { Download, Share2, Check, Copy, FileImage, Layers, PresentationIcon, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ExportOptionsProps {
  images: string[];
  onExport: (format: "single" | "all") => void;
  onShare: () => string;
}

export function ExportOptions({ images, onExport, onShare }: ExportOptionsProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const link = onShare();
    setShareLink(link);
    setShowShareDialog(true);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadAllAsZip = async () => {
    // Download images with proper queuing and delay to prevent browser blocking
    for (const [index, image] of images.entries()) {
      try {
        const a = document.createElement("a");
        a.href = image;
        a.download = `interior-design-${index + 1}.png`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Proper delay to prevent browser blocking (500ms between downloads)
        if (index < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to download image ${index + 1}:`, error);
      }
    }
  };

  const downloadMLSPackage = async () => {
    // Download MLS package with proper queuing
    for (const [index, image] of images.entries()) {
      try {
        const a = document.createElement("a");
        a.href = image;
        a.download = `mls-ready-design-${index + 1}-4k.png`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Proper delay to prevent browser blocking (500ms between downloads)
        if (index < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to download MLS package ${index + 1}:`, error);
      }
    }
  };

  const createListingFlyer = () => {
    // In production, this would generate a PDF flyer
    console.log("Creating listing flyer...");
    alert("Listing flyer feature coming soon! This will generate a professional flyer with before/after comparisons.");
  };

  const createSocialPost = (platform: "facebook" | "instagram") => {
    // In production, this would format for social media
    const message = platform === "facebook" 
      ? "Check out this stunning transformation! 🏡✨ Virtual staging makes all the difference. #RealEstate #VirtualStaging"
      : "Swipe to see the magic of virtual staging! ➡️ Which style is your favorite? #RealEstate #HomeStaging #InteriorDesign";
    
    navigator.clipboard.writeText(message);
    alert(`Caption copied for ${platform}! Upload your favorite design to ${platform} with this caption.`);
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Download Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => onExport("single")}>
              <FileImage className="h-4 w-4 mr-2" />
              Download Current (4K)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadAllAsZip}>
              <Layers className="h-4 w-4 mr-2" />
              Download All ({images.length} designs)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={downloadMLSPackage}>
              <FileImage className="h-4 w-4 mr-2 text-purple-600" />
              <span className="font-medium">Download for MLS</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={createListingFlyer}>
              <PresentationIcon className="h-4 w-4 mr-2 text-purple-600" />
              <span className="font-medium">Create Listing Flyer</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => createSocialPost("facebook")}>
              <Facebook className="h-4 w-4 mr-2 text-blue-600" />
              <span>Share to Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => createSocialPost("instagram")}>
              <Instagram className="h-4 w-4 mr-2 text-pink-600" />
              <span>Share to Instagram</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Design</DialogTitle>
            <DialogDescription>
              Share for instant client feedback
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="font-mono text-sm"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-black" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Clients comment on your designs
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}