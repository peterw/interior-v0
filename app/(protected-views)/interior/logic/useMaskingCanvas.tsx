'use client';

import { useRef, useEffect, useState, MouseEvent, TouchEvent, useCallback } from 'react';

export function useMaskingCanvas(imageUrl: string) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showMask, setShowMask] = useState(true);
  const [hasMask, setHasMask] = useState(false);

  // Load and display the image
  useEffect(() => {
    if (!imageUrl || !canvasRef.current || !maskCanvasRef.current) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    let mounted = true;
    
    img.onload = () => {
      // Check if component is still mounted
      if (!mounted || !canvasRef.current || !maskCanvasRef.current || !containerRef.current) return;
      
      const canvas = canvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const container = containerRef.current;
      
      // Calculate dimensions to fit container while maintaining aspect ratio
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight || 500;
      
      const scale = Math.min(
        containerWidth / img.width,
        containerHeight / img.height
      );
      
      const width = img.width * scale;
      const height = img.height * scale;
      
      setDimensions({ width, height });
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      maskCanvas.width = width;
      maskCanvas.height = height;
      
      // Draw image
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
      }
      
      // Initialize mask canvas with transparent background
      const maskCtx = maskCanvas.getContext('2d');
      if (maskCtx) {
        maskCtx.clearRect(0, 0, width, height);
      }
    };
    
    img.onerror = () => {
      if (mounted) {
        console.error('Failed to load image:', imageUrl);
      }
    };
    
    img.src = imageUrl;
    
    // Cleanup function to prevent memory leaks
    return () => {
      mounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  const getCoordinates = useCallback((e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const canvas = maskCanvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }, []);

  // Helper function to check if canvas has any non-transparent pixels
  const hasCanvasContent = useCallback(() => {
    const canvas = maskCanvasRef.current;
    if (!canvas) return false;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Check if any pixel has alpha > 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) {
        return true;
      }
    }
    return false;
  }, []);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawing || !maskCanvasRef.current) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;
    
    const ctx = maskCanvasRef.current.getContext('2d');
    if (!ctx) return;
    
    ctx.globalCompositeOperation = tool === 'brush' ? 'source-over' : 'destination-out';
    ctx.fillStyle = 'rgba(147, 51, 234, 0.4)'; // Purple mask
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Set mask flag when drawing (performance: don't scan entire canvas on every draw)
    if (tool === 'brush' && !hasMask) {
      setHasMask(true);
    }
  }, [isDrawing, tool, brushSize, hasMask, getCoordinates]);

  const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  }, [draw]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    
    // Check if mask is empty after erasing
    if (tool === 'eraser' && hasMask) {
      if (!hasCanvasContent()) {
        setHasMask(false);
      }
    }
  }, [tool, hasMask, hasCanvasContent]);

  const clearMask = useCallback(() => {
    const canvas = maskCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasMask(false);
  }, []);

  const getMaskDataUrl = useCallback(() => {
    if (!maskCanvasRef.current) return null;
    return maskCanvasRef.current.toDataURL('image/png');
  }, []);

  const toggleMaskVisibility = useCallback(() => {
    setShowMask(prev => !prev);
  }, []);

  return {
    // Refs
    canvasRef,
    maskCanvasRef,
    containerRef,
    
    // State
    isDrawing,
    brushSize,
    setBrushSize,
    tool,
    setTool,
    dimensions,
    showMask,
    hasMask,
    
    // Actions
    startDrawing,
    draw,
    stopDrawing,
    clearMask,
    getMaskDataUrl,
    toggleMaskVisibility,
  };
}
