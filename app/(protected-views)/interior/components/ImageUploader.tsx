"use client";

import React, { useCallback, useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploaderProps {
  onImageUpload: (file: File, preview: string) => void;
  uploadedImage: string | null;
}

export function ImageUploader({ onImageUpload, uploadedImage }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (files && files.length > 0) {
        const file = files[0];
        
        // Check file type
        if (!file.type.startsWith("image/")) {
          alert("Please upload an image file");
          return;
        }
        
        // Check file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert("File size must be less than 10MB");
          return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload(file, reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const clearImage = () => {
    onImageUpload(null as any, "");
  };

  if (uploadedImage) {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <div className="relative w-full h-[400px]">
          <Image
            src={uploadedImage}
            alt="Uploaded room"
            fill
            className="object-cover"
          />
        </div>
        <button
          onClick={clearImage}
          className="absolute top-4 right-4 h-10 w-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <X className="h-5 w-5 text-gray-800" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-200 relative",
        isDragActive
          ? "border-gray-800 bg-gray-50 scale-[1.02]"
          : "border-gray-200 hover:border-gray-400 bg-white hover:shadow-inner"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "h-20 w-20 rounded-full flex items-center justify-center mb-6 transition-all duration-200 mx-auto",
            isDragActive ? "bg-gray-900 text-white" : "bg-gray-100"
          )}
        >
          {isDragActive ? (
            <ImageIcon className="h-10 w-10 text-white" />
          ) : (
            <Upload className="h-10 w-10 text-gray-600" />
          )}
        </div>
        <h3 className="font-medium text-xl mb-3 text-gray-900">
          {isDragActive ? "Drop your photo here" : "Upload room photo"}
        </h3>
        <p className="text-gray-600 text-base mb-4 font-light">
          {isDragActive 
            ? "Release to upload" 
            : "Drag and drop or click to browse"
          }
        </p>
        <p className="text-sm text-gray-500 font-light">
          JPG, PNG, or WEBP • Max 10MB
        </p>
      </div>
    </div>
  );
}