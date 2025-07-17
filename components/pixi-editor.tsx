"use client";

import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

interface PixiEditorProps {
  width?: number;
  height?: number;
}

// Define interfaces for our custom object types
interface ExtendedGraphics extends PIXI.Graphics {
  redraw?: (width: number, height: number) => void;
  updateHandlePosition?: () => void;
}

interface ExtendedSprite extends PIXI.Sprite {
  updateHandlePosition?: () => void;
}

export default function PixiEditor({ width = 800, height = 600 }: PixiEditorProps) {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const [isClient, setIsClient] = useState(false);
  // Use a ref instead of state for tracking initialization to prevent re-renders
  const initialized = useRef(false);

  // Set isClient to true when component mounts to ensure we're in browser environment
  useEffect(() => {
    setIsClient(true);
  }, []);

  // This effect runs once on client-side initialization
  useEffect(() => {
    // Only run this effect on the client side when the container is available
    if (!isClient || !pixiContainer.current || initialized.current) return;

    // Mark as initialized immediately to prevent multiple initialization attempts
    initialized.current = true;

    const initPixi = async () => {
      try {
        console.log("Initializing PixiJS...");
        
        // Dynamically import PIXI to ensure it only loads in browser
        const PIXIModule = await import('pixi.js');
        
        // Create a Pixi Application with v8 API
        const app = new PIXIModule.Application();
        appRef.current = app;
        
        // Set up the application properties
        await app.init({
          width,
          height,
          backgroundColor: 0x061639,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
        });

        // Add the canvas to the DOM (v8 approach)
        if (pixiContainer.current) {
          pixiContainer.current.appendChild(app.canvas);
        }

        // Create a container for all our elements
        const stage = new PIXIModule.Container();
        app.stage.addChild(stage);

        // Add a colored rectangle as a background
        const background = new PIXIModule.Graphics();
        background.rect(0, 0, width, height);
        background.fill(0x1a1a1a);
        stage.addChild(background);
        
        // Create title text
        const titleText = new PIXIModule.Text({
          text: 'Adopt Your Perfect Companion',
          style: {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 0xffffff,
            align: 'center',
            fontWeight: 'bold'
          }
        });
        titleText.anchor.set(0.5, 0.5);
        titleText.position.set(app.screen.width / 2, 100);
        stage.addChild(titleText);
        
        // Variables for interactions
        let isDragging = false;
        let isResizing = false;
        let draggingObject: any = null;
        let resizeHandle: any = null;
        let dragOffset = { x: 0, y: 0 };
        let initialSize = { width: 0, height: 0 };
        let initialDistance = 0;
        
        // Function to create resize handles for an object
        const createResizeHandles = (object: any) => {
            // Create a container for the object and its resize handles
            const container = new PIXIModule.Container();
            container.addChild(object);
            
            // Create corner resize handle
            const resizeCorner = new PIXIModule.Graphics();
            // Make it more visible with an outline
            resizeCorner.lineStyle(2, 0xFFFFFF, 1);
            resizeCorner.beginFill(0xff0000, 0.8);
            resizeCorner.drawCircle(0, 0, 12);
            resizeCorner.endFill();
            
            // Position handle at the bottom-right corner
            const updateHandlePosition = () => {
                if (object.width && object.height) {
                    resizeCorner.x = object.width / 2;
                    resizeCorner.y = object.height / 2;
                } else {
                    // For graphics objects that don't have width/height
                    resizeCorner.x = 100;  // half of the 200px width
                    resizeCorner.y = 100;  // half of the 200px height
                }
            };
            
            updateHandlePosition();
            
            // Make resize handle interactive
            resizeCorner.eventMode = 'static';
            resizeCorner.cursor = 'nwse-resize';
            
            resizeCorner.on('pointerdown', (event: any) => {
                event.stopPropagation();
                isResizing = true;
                resizeHandle = resizeCorner;
                draggingObject = object;
                
                // Store initial size
                initialSize = {
                    width: object.width || 200,
                    height: object.height || 200
                };
                
                // For sprites
                if (object.scale) {
                    initialSize.width = object.texture.orig.width * object.scale.x;
                    initialSize.height = object.texture.orig.height * object.scale.y;
                }
                
                // Calculate initial distance from object center to pointer
                initialDistance = Math.sqrt(
                    Math.pow(event.global.x - object.x, 2) + 
                    Math.pow(event.global.y - object.y, 2)
                );
            });
            
            container.addChild(resizeCorner);
            return { container, updateHandlePosition };
        };
        
        // Global pointer move event handler
        app.stage.eventMode = 'static';
        app.stage.on('pointermove', (event: any) => {
            if (isDragging && draggingObject) {
                draggingObject.x = event.global.x - dragOffset.x;
                draggingObject.y = event.global.y - dragOffset.y;
            }
            else if (isResizing && draggingObject && resizeHandle) {
                // Calculate new distance
                const newDistance = Math.sqrt(
                    Math.pow(event.global.x - draggingObject.x, 2) + 
                    Math.pow(event.global.y - draggingObject.y, 2)
                );
                
                // Calculate scale factor
                const scaleFactor = newDistance / initialDistance;
                
                // Apply new size
                if (draggingObject.texture) {
                    // For sprites
                    const newWidth = initialSize.width * scaleFactor;
                    const newHeight = initialSize.height * scaleFactor;
                    
                    // Update scale based on original texture dimensions
                    draggingObject.scale.x = newWidth / draggingObject.texture.orig.width;
                    draggingObject.scale.y = newHeight / draggingObject.texture.orig.height;
                } else {
                    // For graphics - need to redraw with new dimensions
                    if (draggingObject.redraw) {
                        draggingObject.redraw(initialSize.width * scaleFactor, initialSize.height * scaleFactor);
                    }
                }
                
                // Update resize handle position
                if (draggingObject.updateHandlePosition) {
                    draggingObject.updateHandlePosition();
                }
            }
        });
        
        // Global pointer up event handlers
        app.stage.on('pointerup', () => {
            isDragging = false;
            isResizing = false;
            draggingObject = null;
            resizeHandle = null;
        });
        
        app.stage.on('pointerupoutside', () => {
            isDragging = false;
            isResizing = false;
            draggingObject = null;
            resizeHandle = null;
        });
        
        // Create a blue rectangle with our extended type
        const blueRect = new PIXIModule.Graphics() as ExtendedGraphics;
        const drawRect = (width = 200, height = 200) => {
            blueRect.clear();
            blueRect.rect(-width/2, -height/2, width, height);
            blueRect.fill(0x3498db);
        };
        
        drawRect();
        blueRect.position.set(app.screen.width / 2 - 250, app.screen.height / 2);
        blueRect.eventMode = 'static';
        blueRect.cursor = 'pointer';
        blueRect.redraw = drawRect;  // Add redraw method
        
        blueRect.on('pointerdown', (event: any) => {
            isDragging = true;
            draggingObject = blueRect;
            dragOffset = {
                x: event.global.x - blueRect.x,
                y: event.global.y - blueRect.y
            };
        });
        
        const { container: blueRectContainer, updateHandlePosition: updateBlueHandles } = createResizeHandles(blueRect);
        blueRect.updateHandlePosition = updateBlueHandles;
        stage.addChild(blueRectContainer);
        
        // Load the bunny
        try {
            const bunnyTexture = await PIXIModule.Assets.load('https://pixijs.com/assets/bunny.png');
            const bunny = PIXIModule.Sprite.from(bunnyTexture) as ExtendedSprite;
            
            bunny.anchor.set(0.5);
            bunny.position.set(app.screen.width / 2, app.screen.height / 2 - 150);
            bunny.scale.set(3);
            
            bunny.eventMode = 'static';
            bunny.cursor = 'pointer';
            
            bunny.on('pointerdown', (event: any) => {
                isDragging = true;
                draggingObject = bunny;
                dragOffset = {
                    x: event.global.x - bunny.x,
                    y: event.global.y - bunny.y
                };
            });
            
            const { container: bunnyContainer, updateHandlePosition: updateBunnyHandles } = createResizeHandles(bunny);
            bunny.updateHandlePosition = updateBunnyHandles;
            stage.addChild(bunnyContainer);
        } catch (err) {
            console.error('Failed to load bunny:', err);
        }
        
        // Try to load puppy image
        try {
            const puppyTexture = await PIXIModule.Assets.load('/images/sample-puppy.png');
            const puppy = PIXIModule.Sprite.from(puppyTexture) as ExtendedSprite;
            
            puppy.anchor.set(0.5);
            puppy.position.set(app.screen.width / 2 + 150, app.screen.height / 2);
            
            // Adjust size
            const maxSize = 250;
            const scale = Math.min(maxSize / puppy.width, maxSize / puppy.height);
            puppy.scale.set(scale);
            
            puppy.eventMode = 'static';
            puppy.cursor = 'pointer';
            
            puppy.on('pointerdown', (event: any) => {
                isDragging = true;
                draggingObject = puppy;
                dragOffset = {
                    x: event.global.x - puppy.x,
                    y: event.global.y - puppy.y
                };
            });
            
            const { container: puppyContainer, updateHandlePosition: updatePuppyHandles } = createResizeHandles(puppy);
            puppy.updateHandlePosition = updatePuppyHandles;
            stage.addChild(puppyContainer);
            console.log("Successfully loaded puppy image");
        } catch (err) {
            console.warn('Failed to load puppy image:', err);
        }
        
        // Add instructions text
        const instructionText = new PIXIModule.Text({
            text: 'Drag to reposition, use red handles to resize',
            style: {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: 0xcccccc,
                align: 'center'
            }
        });
        instructionText.anchor.set(0.5, 0.5);
        instructionText.position.set(app.screen.width / 2, height - 50);
        stage.addChild(instructionText);

        console.log("PixiJS initialization complete");
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
        initialized.current = false; // Allow retry on error
      }
    };

    initPixi();

    // Cleanup function
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
        initialized.current = false;
      }
    };
  }, [width, height, isClient]); // Only depend on stable values

  if (!isClient) {
    // Return a placeholder during SSR
    return (
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        <div className="w-full h-full flex items-center justify-center" style={{ width, height }}>
          <div className="text-white">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
      <div ref={pixiContainer} className="w-full h-full" />
      <div className="absolute bottom-2 left-2 right-2 flex justify-center opacity-80">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Drag to reposition, use red handles to resize
        </div>
      </div>
    </div>
  );
} 