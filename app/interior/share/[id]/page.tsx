"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, MessageSquare, ThumbsUp, Home } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/hooks/use-toast";
import Image from "next/image";

interface SharedDesign {
  id: string;
  originalImage: string;
  images: string[];
  style: string;
  generatedAt: string;
  prompt: string;
}

export default function SharePage() {
  const params = useParams();
  const [design, setDesign] = useState<SharedDesign | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchDesign();
  }, [params.id]);

  const fetchDesign = async () => {
    try {
      const response = await fetch(`/interior/api/generate?id=${params.id}`);
      if (!response.ok) throw new Error("Design not found");
      const data = await response.json();
      setDesign(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load design",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interior-design-${design?.style}-${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    
    // In a real app, this would save to a database
    toast({
      title: "Comment sent!",
      description: "Your feedback has been shared with the designer.",
    });
    setComment("");
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Like removed" : "Design liked!",
      description: liked ? "" : "The designer will be notified.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Design not found</h2>
          <p className="text-gray-600">This design may have expired or been removed.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Interior Design Concept</h1>
          </div>
          <p className="text-gray-600">
            Style: <span className="font-medium capitalize">{design.style.replace('-', ' ')}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Generated on {new Date(design.generatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Main Gallery */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Large Preview */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={design.images[selectedImage]}
                  alt={`Design variation ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Strip */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {design.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-purple-600 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Original Image */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Original Room</h3>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={design.originalImage}
                  alt="Original room"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-4 space-y-4">
              <h3 className="font-semibold">Actions</h3>
              
              <Button
                onClick={() => handleDownload(design.images[selectedImage], selectedImage)}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Image
              </Button>

              <Button
                onClick={handleLike}
                className={`w-full ${liked ? 'bg-purple-600 text-white' : ''}`}
                variant={liked ? "default" : "outline"}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                {liked ? 'Liked' : 'Like Design'}
              </Button>
            </Card>

            {/* Feedback */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Leave Feedback</h3>
              <Textarea
                placeholder="Share your thoughts on this design..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3"
                rows={4}
              />
              <Button 
                onClick={handleComment}
                disabled={!comment.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
            </Card>
          </div>
        </div>

        {/* Design Details */}
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Design Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Style:</span>
              <span className="ml-2 font-medium capitalize">
                {design.style.replace('-', ' ')}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Variations:</span>
              <span className="ml-2 font-medium">{design.images.length} designs</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-600">Design Brief:</span>
              <p className="mt-1 text-gray-700">{design.prompt}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}