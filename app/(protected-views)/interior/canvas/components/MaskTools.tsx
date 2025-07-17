"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Brush, RotateCcw, Sparkles } from 'lucide-react';

interface MaskToolsProps {
  tool: 'brush' | 'eraser';
  brushSize: number;
  prompt: string;
  isGenerating: boolean;
  onToolChange: (tool: 'brush' | 'eraser') => void;
  onBrushSizeChange: (size: number) => void;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  onClearMask: () => void;
}

export function MaskTools({
  tool,
  brushSize,
  prompt,
  isGenerating,
  onToolChange,
  onBrushSizeChange,
  onPromptChange,
  onGenerate,
  onClearMask,
}: MaskToolsProps) {
  return (
    <div className="space-y-6">
      {/* Drawing Tools */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Masking Tool
        </Label>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            disabled
          >
            <Brush className="h-4 w-4 mr-1" />
            Brush
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearMask}
            title="Clear mask"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Brush Size */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Brush Size: {brushSize}px
        </Label>
        <Slider
          value={[brushSize]}
          onValueChange={(values) => onBrushSizeChange(values[0])}
          min={10}
          max={100}
          step={5}
          className="w-full"
        />
      </div>

      {/* Instructions */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <h4 className="text-sm font-medium text-purple-900 mb-1">How to use:</h4>
        <ol className="text-xs text-purple-700 space-y-1">
          <li>1. Paint over areas you want to change</li>
          <li>2. Describe what you want to add or modify</li>
          <li>3. Click generate to apply changes</li>
        </ol>
      </div>

      {/* Prompt Input */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          What would you like to change?
        </Label>
        <Textarea
          placeholder="e.g., Add a modern couch here, Change the wall color to blue, Add plants on the shelf"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="min-h-[120px] resize-none text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Be specific about what you want in the masked area
        </p>
      </div>

      {/* Quick Suggestions */}
      <div>
        <p className="text-xs font-medium text-gray-600 mb-2">Quick ideas:</p>
        <div className="flex flex-wrap gap-1">
          {[
            "Add modern sofa",
            "Change wall color",
            "Add plants",
            "Update lighting",
            "Add artwork",
            "Change flooring"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onPromptChange(prompt ? `${prompt}, ${suggestion.toLowerCase()}` : suggestion)}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        size="lg"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 mr-2" />
            Generate Changes
          </>
        )}
      </Button>

      {/* Tips */}
      <div className="text-xs text-gray-500 space-y-1">
        <p className="font-medium">Tips:</p>
        <p>• Use a larger brush for big areas</p>
        <p>• Be precise with your mask for better results</p>
        <p>• Clear descriptions give better outcomes</p>
      </div>
    </div>
  );
}