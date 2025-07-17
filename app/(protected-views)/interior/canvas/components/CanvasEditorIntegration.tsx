/**
 * Canvas Editor Integration Component
 * 
 * This component provides a complete integration between the SimpleMaskCanvas
 * and the canvas API endpoints for mask-based editing.
 */

"use client";

import React, { useRef, useState } from 'react';
import { SimpleMaskCanvas } from './SimpleMaskCanvas';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Wand2, Download, AlertCircle } from 'lucide-react';
import { validateMask, convertToBlackWhiteMask, dilateMask } from '@/lib/utils/canvas/mask-utils';
import { cn } from '@/lib/utils';

interface CanvasEditorIntegrationProps {
  imageUrl: string;
  style?: string;
  onEditComplete?: (editedImageUrl: string) => void;
  className?: string;
}

export function CanvasEditorIntegration({
  imageUrl,
  style,
  onEditComplete,
  className
}: CanvasEditorIntegrationProps) {
  const canvasRef = useRef<any>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(20);

  const handleEdit = async () => {
    if (!canvasRef.current || !prompt.trim()) {
      setError('Please draw a mask and enter a description');
      return;
    }

    const maskDataUrl = canvasRef.current.getMaskDataUrl();
    if (!maskDataUrl) {
      setError('Please draw on the image to select an area to edit');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Validate mask
      const validation = await validateMask(maskDataUrl);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid mask');
        setIsProcessing(false);
        return;
      }

      // Process mask for better results
      let processedMaskUrl = maskDataUrl;
      
      // Convert to black/white if needed (canvas uses purple)
      try {
        processedMaskUrl = await convertToBlackWhiteMask(maskDataUrl);
        // Dilate mask slightly to avoid edge artifacts
        processedMaskUrl = await dilateMask(processedMaskUrl, 3);
      } catch (maskError) {
        console.warn('Mask processing failed, using original:', maskError);
      }

      // Create form data
      const formData = new FormData();
      
      // Convert image URL to File
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], 'image.jpg', { type: imageBlob.type });
      
      formData.append('image', imageFile);
      formData.append('maskDataUrl', processedMaskUrl);
      formData.append('prompt', prompt);
      if (style) {
        formData.append('style', style);
      }
      formData.append('quality', 'preview'); // Use preview for interactive editing

      // Call the canvas API
      const response = await fetch('/interior/api/canvas', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process edit');
      }

      const result = await response.json();
      
      if (result.success && result.editedImage) {
        setEditedImageUrl(result.editedImage);
        if (onEditComplete) {
          onEditComplete(result.editedImage);
        }
      } else {
        throw new Error('No edited image returned');
      }

    } catch (error) {
      console.error('Edit error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process edit');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateFinal = async () => {
    if (!editedImageUrl) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Use the edited image for final generation
      const imageResponse = await fetch(editedImageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], 'edited.jpg', { type: imageBlob.type });
      
      formData.append('image', imageFile);
      if (style) {
        formData.append('style', style);
      }

      const response = await fetch('/interior/api/generate-final', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate final image');
      }

      const result = await response.json();
      
      if (result.success && result.image) {
        setEditedImageUrl(result.image);
        if (onEditComplete) {
          onEditComplete(result.image);
        }
      }

    } catch (error) {
      console.error('Final generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate final image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!editedImageUrl) return;

    try {
      const response = await fetch(editedImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interior-design-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download image');
    }
  };

  const clearAll = () => {
    if (canvasRef.current) {
      canvasRef.current.clearMask();
    }
    setPrompt('');
    setError(null);
    setEditedImageUrl(null);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Original Image with Mask Canvas */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Original Image - Draw to Select Area</h3>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '500px' }}>
            <SimpleMaskCanvas
              imageUrl={imageUrl}
              tool={tool}
              brushSize={brushSize}
              onCanvasReady={(ref) => { canvasRef.current = ref; }}
              className="w-full h-full"
            />
          </div>
          
          {/* Mask Tools */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={tool === 'brush' ? 'default' : 'outline'}
              onClick={() => setTool('brush')}
            >
              Brush
            </Button>
            <Button
              size="sm"
              variant={tool === 'eraser' ? 'default' : 'outline'}
              onClick={() => setTool('eraser')}
              disabled
            >
              Eraser
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm">Size:</span>
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm w-8">{brushSize}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => canvasRef.current?.clearMask()}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Edited Result */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Edited Result</h3>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center" style={{ height: '500px' }}>
            {editedImageUrl ? (
              <img 
                src={editedImageUrl} 
                alt="Edited result" 
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-gray-400 text-center p-8">
                <p>Draw a mask and click "Apply Edit" to see results</p>
              </div>
            )}
          </div>
          
          {/* Result Actions */}
          {editedImageUrl && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={handleGenerateFinal}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-1" />
                )}
                Generate HD
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Prompt Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Describe what you want in the selected area
        </label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Add a modern chandelier, Replace with wooden flooring, Add plants and greenery..."
          className="resize-none"
          rows={3}
        />
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleEdit}
          disabled={isProcessing || !prompt.trim()}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Apply Edit
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={clearAll}
          disabled={isProcessing}
        >
          Reset
        </Button>
      </div>

      {/* Tips */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Draw on the image to select areas you want to change</p>
        <p>• Be specific in your description for better results</p>
        <p>• Use Ctrl+Z to undo your last brush stroke</p>
        <p>• Generate HD for final high-quality output</p>
      </div>
    </div>
  );
}