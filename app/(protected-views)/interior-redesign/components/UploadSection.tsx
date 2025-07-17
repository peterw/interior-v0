"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cf } from "@/lib/cf";
import { Upload, Camera, Sparkles, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  isActive: boolean;
}

export function UploadSection({ onImageUpload, uploadedImage, isActive }: UploadSectionProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === "file-too-large") {
        setError("File is too large. Maximum size is 10MB.");
      } else {
        setError("Please upload a valid image file (JPG, PNG, or WEBP).");
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const clearImage = () => {
    setPreview(null);
    setError(null);
    onImageUpload(null as any);
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              isActive ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              1
            </span>
            Upload Your Room Photo
          </h2>
          <p className="text-gray-600 mt-1 ml-10">
            Upload any room photo to transform
          </p>
        </div>
        
        {!uploadedImage && (
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-600 hover:text-indigo-700"
            onClick={() => {/* Open sample modal */}}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Try with sample photo
          </Button>
        )}
      </div>

      {/* Upload Area */}
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`
            relative group cursor-pointer
            ${isDragActive ? "ring-4 ring-indigo-500 ring-offset-4" : ""}
            ${error ? "ring-2 ring-red-500" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          {/* Main Drop Zone */}
          <div className={`
            relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
            ${isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"}
            ${error ? "border-red-500 bg-red-50" : "bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"}
          `}>
            <div className="p-12 text-center">
              {/* Upload Icon with Animation */}
              <div className="flex justify-center mb-6">
                <div className={`
                  relative rounded-full p-6 transition-all duration-300
                  ${isDragActive ? "bg-indigo-100 scale-110" : "bg-gray-100 group-hover:bg-indigo-100 group-hover:scale-105"}
                `}>
                  <Upload className={`
                    w-12 h-12 transition-colors duration-300
                    ${isDragActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"}
                  `} />
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              {/* CTA Text */}
              <div className="space-y-2 mb-6">
                <p className="text-xl font-semibold text-gray-900">
                  {isDragActive ? "Drop your photo here" : "Drag & drop your room photo"}
                </p>
                <p className="text-gray-500">
                  or{" "}
                  <span className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                    click to browse
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose Photo
                </Button>
                
                <span className="text-gray-400">or</span>
                
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Mobile camera capture
                  }}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </Button>
              </div>

              {/* File Requirements */}
              <p className="text-xs text-gray-500 mt-6">
                Supports JPG, PNG, WEBP up to 10MB • Best results with well-lit rooms
              </p>
            </div>

            {/* Visual Hints */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                10 free left
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>
      ) : (
        /* Image Preview */
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-indigo-500 ring-offset-4">
            {preview && (
              <Image
                src={preview}
                alt="Uploaded room"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            )}
            
            {/* Overlay Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={clearImage}
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <X className="w-4 h-4 mr-1" />
                Change Photo
              </Button>
            </div>
            
            {/* Success Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Ready for transformation!</span>
            </div>
          </div>
          
          {/* Next Step Hint */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 flex items-center justify-center gap-2">
              Great! Now choose a design style
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}