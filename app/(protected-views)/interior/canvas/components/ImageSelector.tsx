"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface HistoryImage {
  id: string;
  transformedImage: string;
  style: string;
  createdAt: string;
}

interface ImageSelectorProps {
  images: HistoryImage[];
  selectedId: string | null;
  onSelectImage: (imageUrl: string, id: string) => void;
}

export function ImageSelector({ images, selectedId, onSelectImage }: ImageSelectorProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-3">
      {images.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "p-2 cursor-pointer transition-all hover:shadow-md",
            selectedId === item.id && "ring-2 ring-purple-500 shadow-md"
          )}
          onClick={() => onSelectImage(item.transformedImage, item.id)}
        >
          <div className="relative">
            <img
              src={item.transformedImage}
              alt={item.style}
              className="w-full h-32 object-cover rounded"
            />
            <Badge 
              className="absolute top-1 right-1 text-xs" 
              variant="secondary"
            >
              {item.style}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {formatDate(item.createdAt)}
          </div>
        </Card>
      ))}
      
      {images.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No previous designs found</p>
          <p className="text-xs text-gray-400 mt-1">
            Generate some designs first
          </p>
        </div>
      )}
    </div>
  );
}