"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Download, 
  Edit, 
  Share2, 
  Calendar, 
  ChevronDown,
  Play,
  Image as ImageIcon,
  Palette,
  MoreHorizontal,
  Trash2,
  Eye,
  Copy,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { INTERIOR_STYLES } from "../constants/styles";
import Link from "next/link";

// Loading skeleton component
const GenerationSkeleton = () => (
  <Card className="p-6 border-0 bg-white">
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex-shrink-0">
        <div className="w-full sm:w-52 h-40 rounded-xl bg-gray-200 animate-pulse" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
      </div>
      <div className="hidden sm:flex flex-col gap-2 w-36">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  </Card>
);

export default function InteriorHistoryPage() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareSettings, setShareSettings] = useState({
    expiresIn: 24, // hours
    allowDownload: true,
    password: "",
  });
  const [selectedGenerationId, setSelectedGenerationId] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  // Fetch generation history
  const history = useQuery(api.interior.getGenerationHistory, { limit: 50 });
  const createShare = useMutation(api.interior.createShare);

  const handleShare = async () => {
    if (!selectedGenerationId) return;

    try {
      const shareId = await createShare({
        generationId: selectedGenerationId as any,
        expiresIn: shareSettings.expiresIn,
        allowDownload: shareSettings.allowDownload,
        password: shareSettings.password || undefined,
      });

      const url = `${window.location.origin}/interior/share/${shareId}`;
      setShareUrl(url);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied to clipboard!");
    } catch (error) {
      console.error("Failed to create share:", error);
      toast.error("Failed to create share link");
    }
  };

  const handleDownload = async (imageUrl: string, style: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interior-${style}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image");
    }
  };

  const getStyleName = (styleId: string) => {
    return INTERIOR_STYLES[styleId as keyof typeof INTERIOR_STYLES]?.name || styleId;
  };

  return (
    <div className="flex-1 h-full">
      <div className="mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Generation History
          </h1>
          <p className="text-gray-600">
            Manage your interior design transformations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm">
            <Palette className="h-4 w-4 mr-2" />
            All styles
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm">
            <ImageIcon className="h-4 w-4 mr-2" />
            Images only
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {/* Generation List */}
        <div className="space-y-4">
          {!history ? (
            // Loading state
            <>
              <GenerationSkeleton />
              <GenerationSkeleton />
              <GenerationSkeleton />
            </>
          ) : history.length === 0 ? (
            // Empty state
            <Card className="p-12 text-center border-0 bg-white">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No generations yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create beautiful room designs
              </p>
              <Link href="/interior">
                <Button>
                  <Palette className="h-4 w-4 mr-2" />
                  Create Design
                </Button>
              </Link>
            </Card>
          ) : (
            // Generation items
            history.map((item: any) => (
              <Card key={item._id} className="p-6 border-0 bg-white hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="relative w-full sm:w-52 h-40 rounded-xl overflow-hidden bg-gray-100">
                      {item.generation?.generatedImageUrl ? (
                        <Image
                          src={item.generation.generatedImageUrl}
                          alt="Generated interior"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {item.generation?.quality === "final" && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          HD
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {getStyleName(item.style)} Design
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span>{getStyleName(item.style)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                      </div>
                      {item.generation?.generationTime && (
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          <span>Generated in {(item.generation.generationTime / 1000).toFixed(1)}s</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 sm:w-36">
                    {item.generation?.generatedImageUrl && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(
                            item.generation!.generatedImageUrl!,
                            item.style
                          )}
                        >
                          <Download className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedGenerationId(item.generationId);
                            setShareModalOpen(true);
                          }}
                        >
                          <Share2 className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Share</span>
                        </Button>
                      </>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Design
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Share Modal */}
        <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Design</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {shareUrl ? (
                <>
                  <div className="space-y-2">
                    <Label>Share Link</Label>
                    <div className="flex gap-2">
                      <Input value={shareUrl} readOnly />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl);
                          toast.success("Link ready to share!");
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(shareUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setShareModalOpen(false);
                      setShareUrl(null);
                    }}
                  >
                    Done
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Expires After</Label>
                    <select
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={shareSettings.expiresIn}
                      onChange={(e) => setShareSettings({
                        ...shareSettings,
                        expiresIn: parseInt(e.target.value)
                      })}
                    >
                      <option value={1}>1 hour</option>
                      <option value={24}>24 hours</option>
                      <option value={168}>7 days</option>
                      <option value={720}>30 days</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="download">Allow Download</Label>
                    <Switch
                      id="download"
                      checked={shareSettings.allowDownload}
                      onCheckedChange={(checked) => setShareSettings({
                        ...shareSettings,
                        allowDownload: checked
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password (Optional)</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Optional password"
                      value={shareSettings.password}
                      onChange={(e) => setShareSettings({
                        ...shareSettings,
                        password: e.target.value
                      })}
                    />
                  </div>

                  <Button className="w-full" onClick={handleShare}>
                    Create Share Link
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}