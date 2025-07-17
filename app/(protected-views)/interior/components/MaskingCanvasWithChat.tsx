'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Paintbrush, Eraser, RotateCcw, Sparkles, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMaskingCanvas } from '../logic/useMaskingCanvas';

interface MaskingCanvasWithChatProps {
  imageUrl: string;
  onComplete?: (maskDataUrl: string, prompt: string) => void;
  className?: string;
}

export function MaskingCanvasWithChat({ imageUrl, onComplete, className }: MaskingCanvasWithChatProps) {
  const {
    canvasRef,
    maskCanvasRef,
    containerRef,
    isDrawing,
    brushSize,
    setBrushSize,
    tool,
    setTool,
    dimensions,
    showMask,
    hasMask,
    startDrawing,
    draw,
    stopDrawing,
    clearMask,
    getMaskDataUrl,
    toggleMaskVisibility,
  } = useMaskingCanvas(imageUrl);
  
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim() || !hasMask) return;
    
    const maskDataUrl = getMaskDataUrl();
    
    if (maskDataUrl && onComplete) {
      onComplete(maskDataUrl, prompt.trim());
    }
  };

  const canSubmit = hasMask && prompt.trim().length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Canvas and Tools */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant={tool === 'brush' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('brush')}
              >
                <Paintbrush className="h-4 w-4 mr-1" />
                Paint
              </Button>
              <Button
                variant={tool === 'eraser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTool('eraser')}
              >
                <Eraser className="h-4 w-4 mr-1" />
                Erase
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearMask}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMaskVisibility}
            >
              {showMask ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hide Mask
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Show Mask
                </>
              )}
            </Button>
          </div>
          
          {/* Brush Size */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium whitespace-nowrap">Brush Size:</span>
            <Slider
              value={[brushSize]}
              onValueChange={([value]) => setBrushSize(value)}
              min={10}
              max={100}
              step={5}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12">{brushSize}px</span>
          </div>
          
          {/* Canvas */}
          <div 
            ref={containerRef}
            className="relative bg-muted rounded-lg overflow-hidden mx-auto"
            style={{ height: '500px', maxWidth: '100%' }}
          >
            <canvas
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            <canvas
              ref={maskCanvasRef}
              className={cn(
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair transition-opacity",
                !showMask && "opacity-0"
              )}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>
      </Card>

      {/* Chat Input */}
      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What would you like to change?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Tell us your design ideas
            </p>
            <Textarea
              placeholder="e.g., Add modern furniture, change colors, update decor"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {hasMask ? 'Mask applied to image' : 'Paint areas you want to change'}
            </p>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>1. Paint over the areas you want to modify</p>
        <p>2. Describe the changes you want in those areas</p>
        <p>3. Click generate to apply your changes</p>
      </div>
    </div>
  );
}