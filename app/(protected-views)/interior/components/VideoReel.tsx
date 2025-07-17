"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Download, Play, Share2, Video } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import { VideoPreview } from "./VideoPreview";

interface VideoReelProps {
  originalImage: string | null;
  generatedImage: string | null;
  style: string;
  videoStyle?: string;
}

export function VideoReel({ originalImage, generatedImage, style, videoStyle }: VideoReelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const generateReel = async () => {
    if (!originalImage || !generatedImage) {
      toast({
        title: "Missing images",
        description: "Both original and generated images are required to create a reel",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/interior/api/generate-reel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalImage,
          generatedImage,
          style,
          videoStyle,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate reel");
      }

      const data = await response.json();

      // Handle client-side rendering fallback
      if (data.requiresClientRendering) {
        setShowPreview(true);
        toast({
          title: "Preview ready",
          description: "Use the export button to generate your HD video",
        });
      } else {
        setVideoUrl(data.videoUrl);
        setShowPreview(true);
        
        toast({
          title: "Reel generated!",
          description: `Your 15-second ${style} transformation reel is ready`,
        });
      }
    } catch (error) {
      console.error("Reel generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate reel",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `interior-design-reel-${style}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareVideo = async () => {
    if (!videoUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Interior Design Transformation",
          text: `Check out this amazing ${style} room transformation!`,
          url: videoUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(videoUrl);
      toast({
        title: "Link copied!",
        description: "Video link has been copied to clipboard",
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">15-Second Transformation Reel</h3>
          </div>
          {videoUrl && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(true)}
              >
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadVideo}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={shareVideo}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Create MLS-ready transformation videos in seconds
        </p>

        {!videoUrl ? (
          <Button
            onClick={() => setShowPreview(true)}
            disabled={!originalImage || !generatedImage}
            className="w-full"
          >
            <Play className="mr-2 h-4 w-4" />
            Preview & Generate Reel
          </Button>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">✓ Reel generated successfully</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">15-second MP4</span>
              <Button
                variant="outline"
                size="sm"
                onClick={generateReel}
                disabled={isGenerating}
              >
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Interior Transformation Reel</DialogTitle>
          </DialogHeader>
          {originalImage && generatedImage && (
            <VideoPreview
              beforeImage={originalImage}
              afterImage={generatedImage}
              styleName={style.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              videoStyle={videoStyle}
              onExport={async () => {
                setIsGenerating(true);
                try {
                  await generateReel();
                  toast({
                    title: "Video exported!",
                    description: "Your HD video is being processed",
                  });
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsGenerating(false);
                }
              }}
            />
          )}
          {videoUrl && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">✓ HD video ready for download</p>
              <Button onClick={downloadVideo} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download MP4 (1080p)
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}