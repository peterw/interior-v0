"use client";

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SimpleMaskCanvasProps {
  imageUrl: string;
  tool: 'brush' | 'eraser';
  brushSize: number;
  onCanvasReady?: (ref: any) => void;
  className?: string;
}

export function SimpleMaskCanvas({
  imageUrl,
  tool,
  brushSize,
  onCanvasReady,
  className
}: SimpleMaskCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [hasMask, setHasMask] = useState(false);
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef(-1);

  // Save current mask state to history
  const saveToHistory = () => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    
    const ctx = maskCanvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    
    // Remove any states after current index
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    
    // Add new state
    historyRef.current.push(imageData);
    historyIndexRef.current++;
    
    // Limit history to 20 states
    if (historyRef.current.length > 20) {
      historyRef.current.shift();
      historyIndexRef.current--;
    }
  };

  // Undo last action
  const undo = () => {
    if (historyIndexRef.current <= 0) return;
    
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    
    const ctx = maskCanvas.getContext('2d');
    if (!ctx) return;
    
    historyIndexRef.current--;
    const previousState = historyRef.current[historyIndexRef.current];
    
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      setHasMask(historyIndexRef.current > 0);
    }
  };

  // Extract masked image data
  const extractMaskedImage = () => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    
    if (!canvas || !maskCanvas || !hasMask) return null;
    
    const ctx = canvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');
    
    if (!ctx || !maskCtx) return null;
    
    // Create a temporary canvas to extract the masked area
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return null;
    
    // Draw the original image
    tempCtx.drawImage(canvas, 0, 0);
    
    // Get the mask data
    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply mask to extract only the masked area
    for (let i = 0; i < maskData.data.length; i += 4) {
      // Check if this pixel is masked (has purple color)
      const r = maskData.data[i];
      const g = maskData.data[i + 1];
      const b = maskData.data[i + 2];
      const a = maskData.data[i + 3];
      
      // If pixel is not masked (no purple color), make it transparent
      if (r < 100 || g < 50 || b < 200 || a < 100) {
        imageData.data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }
    
    // Put the masked image data back to temp canvas
    tempCtx.putImageData(imageData, 0, 0);
    
    return tempCanvas.toDataURL('image/png');
  };

  // Get mask data at original image dimensions
  const getMaskDataAtOriginalSize = () => {
    const maskCanvas = maskCanvasRef.current;
    
    if (!maskCanvas || !hasMask || !originalDimensions.width || !originalDimensions.height) return null;
    
    // Create a new canvas at original image dimensions
    const originalSizeCanvas = document.createElement('canvas');
    originalSizeCanvas.width = originalDimensions.width;
    originalSizeCanvas.height = originalDimensions.height;
    const originalSizeCtx = originalSizeCanvas.getContext('2d');
    
    if (!originalSizeCtx) return null;
    
    // Fill with black background
    originalSizeCtx.fillStyle = 'black';
    originalSizeCtx.fillRect(0, 0, originalDimensions.width, originalDimensions.height);
    
    // Get the mask data from the display canvas
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) return null;
    
    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    
    // Create a new ImageData at original size
    const originalSizeMaskData = originalSizeCtx.createImageData(originalDimensions.width, originalDimensions.height);
    
    // Scale the mask data to original dimensions
    const scaleX = originalDimensions.width / maskCanvas.width;
    const scaleY = originalDimensions.height / maskCanvas.height;
    
    for (let y = 0; y < originalDimensions.height; y++) {
      for (let x = 0; x < originalDimensions.width; x++) {
        const sourceX = Math.floor(x / scaleX);
        const sourceY = Math.floor(y / scaleY);
        
        const sourceIndex = (sourceY * maskCanvas.width + sourceX) * 4;
        const targetIndex = (y * originalDimensions.width + x) * 4;
        
        // Check if the source pixel is masked (has purple color)
        const r = maskData.data[sourceIndex];
        const g = maskData.data[sourceIndex + 1];
        const b = maskData.data[sourceIndex + 2];
        const a = maskData.data[sourceIndex + 3];
        
        // If pixel is masked (has purple color), make it white, otherwise keep black
        if (r >= 100 && g >= 50 && b >= 200 && a >= 100) {
          originalSizeMaskData.data[targetIndex] = 255;     // R
          originalSizeMaskData.data[targetIndex + 1] = 255; // G
          originalSizeMaskData.data[targetIndex + 2] = 255; // B
          originalSizeMaskData.data[targetIndex + 3] = 255; // A
        } else {
          originalSizeMaskData.data[targetIndex] = 0;       // R
          originalSizeMaskData.data[targetIndex + 1] = 0;   // G
          originalSizeMaskData.data[targetIndex + 2] = 0;   // B
          originalSizeMaskData.data[targetIndex + 3] = 255; // A
        }
      }
    }
    
    // Put the scaled mask data to the original size canvas
    originalSizeCtx.putImageData(originalSizeMaskData, 0, 0);
    
    return originalSizeCanvas.toDataURL('image/png');
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Create imperative handle for parent to use
  useEffect(() => {
    if (onCanvasReady) {
      onCanvasReady({
        getMaskDataUrl: () => {
          return getMaskDataAtOriginalSize();
        },
        getMaskedImageDataUrl: () => {
          return extractMaskedImage();
        },
        clearMask: () => {
          const maskCanvas = maskCanvasRef.current;
          if (!maskCanvas) return;
          
          const ctx = maskCanvas.getContext('2d');
          if (!ctx) return;
          
          // Save current state before clearing
          saveToHistory();
          
          ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
          setHasMask(false);
          
          // Save the cleared state
          saveToHistory();
        }
      });
    }
  }, [onCanvasReady, hasMask, originalDimensions]);

  // Load and display image
  useEffect(() => {
    if (!imageUrl || !canvasRef.current || !maskCanvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');

    if (!ctx || !maskCtx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Store original dimensions
      setOriginalDimensions({ width: img.width, height: img.height });
      
      // Calculate dimensions to fit container while maintaining aspect ratio
      const containerRect = container.getBoundingClientRect();
      // Use most of the container space with some padding
      const maxWidth = containerRect.width * 0.95;
      const maxHeight = containerRect.height * 0.95;
      
      const scale = Math.min(
        maxWidth / img.width,
        maxHeight / img.height
      );
      
      const width = img.width * scale;
      const height = img.height * scale;
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      maskCanvas.width = width;
      maskCanvas.height = height;
      
      setDimensions({ width, height });
      
      // Draw image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Clear mask
      maskCtx.clearRect(0, 0, width, height);
      setHasMask(false);
      
      // Reset history with empty state
      historyRef.current = [];
      historyIndexRef.current = -1;
      saveToHistory();
    };
    
    img.src = imageUrl;
  }, [imageUrl]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!maskCanvasRef.current) return;
    
    // Save state before drawing
    if (!isDrawing) {
      saveToHistory();
    }
    
    setIsDrawing(true);
    const canvas = maskCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left
      : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e
      ? e.touches[0].clientY - rect.top
      : (e as React.MouseEvent).clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.globalCompositeOperation = 'source-over'; // Always paint mode
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)'; // Purple mask color
    ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !maskCanvasRef.current) return;
    
    const canvas = maskCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = 'touches' in e
      ? e.touches[0].clientX - rect.left
      : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e
      ? e.touches[0].clientY - rect.top
      : (e as React.MouseEvent).clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasMask(true);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      // Save state after drawing
      saveToHistory();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full flex items-center justify-center", className)}
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block max-w-full max-h-full shadow-lg rounded-lg"
        />
        <canvas
          ref={maskCanvasRef}
          className={cn(
            "absolute top-0 left-0 max-w-full max-h-full rounded-lg",
            'cursor-crosshair'
          )}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {/* Undo hint */}
        {hasMask && historyIndexRef.current > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none">
            Ctrl+Z to undo
          </div>
        )}
      </div>
    </div>
  );
}