/**
 * Example Integration Page
 * 
 * This demonstrates how to use the canvas editor with the API endpoints.
 * Copy this code into your page.tsx or component where you need canvas editing.
 */

"use client";

import React, { useState } from 'react';
import { CanvasEditorIntegration } from './components/CanvasEditorIntegration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Example usage in a page
export default function CanvasEditorExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern-minimalist');
  const [results, setResults] = useState<string[]>([]);

  // Example images (replace with your actual images)
  const exampleImages = [
    '/images/examples/room1.jpg',
    '/images/examples/room2.jpg',
    '/images/examples/room3.jpg',
  ];

  const styles = [
    { id: 'modern-minimalist', name: 'Modern Minimalist' },
    { id: 'cozy-scandinavian', name: 'Cozy Scandinavian' },
    { id: 'luxury-modern', name: 'Luxury Modern' },
    { id: 'rustic-farmhouse', name: 'Rustic Farmhouse' },
  ];

  const handleEditComplete = (editedImageUrl: string) => {
    setResults(prev => [...prev, editedImageUrl]);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Canvas Editor Example</CardTitle>
          <CardDescription>
            Select an image, choose a style, then draw on the image to select areas for editing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="examples">Example Images</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Click to upload an image or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, WebP up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {exampleImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
                  >
                    <img 
                      src={image} 
                      alt={`Example ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Style Selection */}
          <div className="space-y-2 mt-6">
            <h3 className="text-sm font-medium">Select Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((style) => (
                <Button
                  key={style.id}
                  variant={selectedStyle === style.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStyle(style.id)}
                >
                  {style.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Editor */}
      {selectedImage && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Image</CardTitle>
            <CardDescription>
              Draw on the image to select areas, then describe what you want to change.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CanvasEditorIntegration
              imageUrl={selectedImage}
              style={selectedStyle}
              onEditComplete={handleEditComplete}
            />
          </CardContent>
        </Card>
      )}

      {/* Results Gallery */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Edits</CardTitle>
            <CardDescription>
              All your edited images will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((result, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={result} 
                    alt={`Edit ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}