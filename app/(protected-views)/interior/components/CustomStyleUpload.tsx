"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Plus, Sparkles, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ReferenceImage {
  file: File;
  preview: string;
  mask?: string;
}

interface CustomStyleUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStyleCreated?: (styleId: string) => void;
}

export function CustomStyleUpload({ open, onOpenChange, onStyleCreated }: CustomStyleUploadProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const createCustomStyle = useMutation(api.interior.createCustomStyle);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setReferenceImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  });

  const removeImage = (index: number) => {
    setReferenceImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a style name");
      return;
    }

    if (referenceImages.length < 3) {
      toast.error("Please upload at least 3 reference images");
      return;
    }

    setIsUploading(true);

    try {
      // First, analyze the images to extract style characteristics
      const formData = new FormData();
      referenceImages.forEach((img) => {
        formData.append("images", img.file);
      });

      const analysisResponse = await fetch("/api/interior/analyze-style", {
        method: "POST",
        body: formData,
      });

      if (!analysisResponse.ok) {
        throw new Error("Failed to analyze style images");
      }

      const analysisData = await analysisResponse.json();

      // Convert images to base64
      const imagePromises = referenceImages.map(async (img) => {
        const buffer = await img.file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return {
          url: `data:${img.file.type};base64,${base64}`,
          mask: img.mask
        };
      });

      const referenceImageData = await Promise.all(imagePromises);

      // Create the custom style with analysis data
      const styleId = await createCustomStyle({
        name: name.trim(),
        description: description.trim(),
        referenceImages: referenceImageData,
        prompt: analysisData.prompt,
        extractedCharacteristics: analysisData.characteristics,
        isPublic,
        tags
      });

      toast.success("Custom style created successfully!");
      
      // Reset form
      setName("");
      setDescription("");
      setReferenceImages([]);
      setTags([]);
      setIsPublic(false);
      
      onOpenChange(false);
      onStyleCreated?.(styleId);
      
    } catch (error) {
      console.error("Failed to create custom style:", error);
      toast.error("Failed to create custom style");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Create Custom Style
          </DialogTitle>
          <DialogDescription>
            Upload 3-5 reference images to create your unique style.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Style Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Style Name</Label>
            <Input
              id="name"
              placeholder="e.g., Modern Coastal Luxe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe the key characteristics of this style..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Reference Images */}
          <div className="space-y-2">
            <Label>Reference Images (3-5 required)</Label>
            
            {referenceImages.length < 5 && (
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"
                )}
              >
                <input {...getInputProps()} />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                {isDragActive ? (
                  <p className="text-sm text-gray-600">Drop the images here...</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      Drop images here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {5 - referenceImages.length} more images needed
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Image Preview Grid */}
            {referenceImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {referenceImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={img.preview}
                      alt={`Reference ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover w-full h-32"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTag}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Public/Private Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public" className="text-base">Make Public</Label>
              <p className="text-sm text-gray-500">
                Let others discover and use this style
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isPublic ? <Globe className="w-4 h-4 text-gray-500" /> : <Lock className="w-4 h-4 text-gray-500" />}
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUploading || !name.trim() || referenceImages.length < 3}
          >
            {isUploading ? "Creating..." : "Create Style"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}