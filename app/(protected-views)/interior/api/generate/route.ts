/**
 * Interior Design Generation API Route
 * 
 * This route handles interior design image generation using FAL.AI models.
 * 
 * Features:
 * - Basic style transfer (full image transformation)
 * - Inpainting (masked area editing)
 * - Multiple quality settings (fast, preview, final)
 * - 4 variations per generation (or 1 for tweaks)
 * - Automatic retry logic for failed generations
 * 
 * Request body (FormData):
 * - image: File - The original room image
 * - style: string - The interior design style ID
 * - maskImage?: File - Optional mask for inpainting
 * - maskPrompt?: string - Prompt for masked area
 * - tweakPrompt?: string - Specific tweak request
 * - roomType?: string - Type of room (living_room, bedroom, etc.)
 * - quality?: string - Generation quality (fast, preview, final)
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { fal } from "@fal-ai/client";

// Configure FAL with API key
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  });
}

// Style prompts mapping
const STYLE_PROMPTS = {
  "modern-minimalist": {
    name: "Modern Minimalist",
    prompt: "modern minimalist interior design, clean lines, neutral colors, minimal furniture, open space, natural light, white walls, wooden accents, simplicity",
    negativePrompt: "cluttered, busy, ornate, dark, heavy furniture",
  },
  "cozy-scandinavian": {
    name: "Cozy Scandinavian",
    prompt: "scandinavian interior design, hygge, cozy atmosphere, light wood, white and gray tones, soft textiles, warm lighting, minimal decor, natural materials",
    negativePrompt: "dark colors, heavy curtains, cluttered, industrial",
  },
  "luxury-modern": {
    name: "Luxury Modern",
    prompt: "luxury modern interior, high-end materials, marble, gold accents, designer furniture, sophisticated lighting, elegant decor, spacious, premium finishes",
    negativePrompt: "cheap materials, cluttered, small space, outdated",
  },
  "rustic-farmhouse": {
    name: "Rustic Farmhouse",
    prompt: "rustic farmhouse interior, reclaimed wood, vintage decor, warm colors, exposed beams, cozy textiles, antique furniture, country charm, natural textures",
    negativePrompt: "modern, minimalist, industrial, cold colors",
  },
  "industrial-chic": {
    name: "Industrial Chic",
    prompt: "industrial chic interior, exposed brick, metal fixtures, concrete floors, edison bulbs, vintage furniture, urban loft style, raw materials, open ceiling",
    negativePrompt: "traditional, ornate, carpeted, pastel colors",
  },
  "bohemian-eclectic": {
    name: "Bohemian Eclectic",
    prompt: "bohemian eclectic interior, colorful textiles, mixed patterns, plants, vintage rugs, artistic decor, layered textures, warm earth tones, creative space",
    negativePrompt: "minimalist, monochrome, stark, empty",
  },
  "classic-traditional": {
    name: "Classic Traditional",
    prompt: "classic traditional interior, elegant furniture, rich wood tones, formal decor, crown molding, upholstered chairs, refined details, timeless design",
    negativePrompt: "modern, industrial, minimalist, casual",
  },
  "coastal-beach": {
    name: "Coastal Beach",
    prompt: "coastal beach house interior, light blue and white, natural textures, driftwood, nautical decor, bright airy space, ocean inspired, relaxed atmosphere",
    negativePrompt: "dark colors, heavy furniture, urban, industrial",
  },
  "mid-century-modern": {
    name: "Mid-Century Modern",
    prompt: "mid-century modern interior, retro furniture, wood paneling, geometric patterns, warm colors, vintage lighting, clean lines, 1950s-60s style",
    negativePrompt: "ornate, traditional, cluttered, contemporary",
  },
  "zen-japanese": {
    name: "Zen Japanese",
    prompt: "zen japanese interior, minimalist, natural materials, low furniture, paper screens, bamboo, neutral colors, peaceful atmosphere, clean aesthetic",
    negativePrompt: "cluttered, bright colors, western furniture, busy patterns",
  },
};

function generateStylePrompt(style: string, roomType?: string, customPrompt?: string): { prompt: string; negativePrompt: string } {
  const styleConfig = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS] || STYLE_PROMPTS["modern-minimalist"];
  
  let prompt = styleConfig.prompt;
  
  // Add room type if specified
  if (roomType) {
    const roomDescriptions: Record<string, string> = {
      living_room: "living room with comfortable seating area",
      bedroom: "bedroom with bed and nightstands",
      kitchen: "kitchen with modern appliances and cabinets",
      bathroom: "bathroom with modern fixtures",
      office: "home office with desk and shelving",
    };
    prompt += `, ${roomDescriptions[roomType] || "interior space"}`;
  }
  
  // Add custom prompt if provided
  if (customPrompt) {
    prompt += `, ${customPrompt}`;
  }
  
  // Always add quality modifiers
  prompt += ", professional interior photography, high quality, 8k resolution, architectural digest style";
  
  return {
    prompt,
    negativePrompt: styleConfig.negativePrompt,
  };
}

async function uploadImageToStorage(file: File, convex: ConvexHttpClient): Promise<string> {
  // Convert to data URL for FAL processing
  // Note: In production, you should upload to a CDN or cloud storage
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

async function storeGenerationResult(
  convex: ConvexHttpClient,
  originalImageUrl: string,
  generatedImageUrl: string,
  style: string,
  prompt: string,
  maskUrl?: string,
  maskedAreaPrompt?: string
) {
  // Store the generation result in Convex
  // This is a simplified version - you may want to create a dedicated mutation
  try {
    // For now, we'll just log the result
    // TODO: Create a mutation to store generation results
    console.log("Storing generation result:", {
      originalImageUrl: originalImageUrl.substring(0, 50) + "...",
      generatedImageUrl,
      style,
      prompt,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to store generation result:", error);
  }
}

async function generateWithRetry(input: any, model: string, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await fal.subscribe(model, {
        input,
        logs: true,
        onQueueUpdate: (update) => {
          console.log("Queue update:", update);
        },
      });
      
      const resultAny = result as any;
      if (resultAny.images && resultAny.images.length > 0) {
        return resultAny;
      }
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
      
      // Wait before retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  
  throw lastError || new Error("Generation failed after retries");
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication using cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Verify FAL API key is configured
    if (!process.env.FAL_API_KEY) {
      console.error("FAL_API_KEY is not configured");
      return NextResponse.json(
        { error: "Interior AI service is not configured properly" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const style = formData.get("style") as string;
    const maskImage = formData.get("maskImage") as File | null;
    const maskPrompt = formData.get("maskPrompt") as string | null;
    const tweakPrompt = formData.get("tweakPrompt") as string | null;
    const tweakIndex = formData.get("tweakIndex") as string | null;
    const roomType = formData.get("roomType") as string | null;
    const quality = formData.get("quality") as string || "preview";

    if (!image || !style) {
      return NextResponse.json(
        { error: "Image and style are required" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, and WebP images are supported" },
        { status: 400 }
      );
    }

    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      
      // Upload images to get URLs
      const originalImageUrl = await uploadImageToStorage(image, convex);
      let maskUrl: string | undefined;
      if (maskImage) {
        maskUrl = await uploadImageToStorage(maskImage, convex);
      }
      
      // Generate variations
      const variations = [];
      const numVariations = tweakPrompt ? 1 : 4;
      
      // Choose model based on quality and task
      let model: string;
      const useInpainting = !!maskUrl;
      
      // Model selection based on quality and features
      if (quality === "final") {
        model = "fal-ai/flux/dev";  // High quality, slower
      } else if (quality === "fast") {
        model = "fal-ai/fast-sdxl";  // Fast preview
      } else {
        model = "fal-ai/flux/schnell";  // Balance of speed and quality
      }

      // Generate each variation
      for (let i = 0; i < numVariations; i++) {
        try {
          // Generate style prompt with variations
          let customPrompt = maskPrompt || tweakPrompt || "";
          
          if (!maskPrompt && !tweakPrompt) {
            const lightingVariations = [
              "", // Use default
              "warm ambient lighting, golden hour",
              "bright natural daylight, sun-filled",
              "moody evening lighting, dramatic shadows"
            ];
            customPrompt = lightingVariations[i % lightingVariations.length];
          }
          
          const { prompt, negativePrompt } = generateStylePrompt(style, roomType || undefined, customPrompt);
          
          let result;
          
          if (useInpainting && maskUrl) {
            // Use inpainting for masked areas
            result = await generateWithRetry({
              prompt,
              negative_prompt: negativePrompt,
              image_url: originalImageUrl,
              mask_url: maskUrl,
              strength: 0.95,
              num_images: 1,
              image_size: quality === "final" ? "landscape_16_9" : "landscape_4_3",
              num_inference_steps: quality === "final" ? 28 : 4,
              guidance_scale: 7.5,
              enable_safety_checker: true,
            }, "fal-ai/flux/dev/image-to-image");
          } else {
            // Use style transfer for full image
            result = await generateWithRetry({
              prompt,
              negative_prompt: negativePrompt,
              image_url: originalImageUrl,
              strength: 0.85,
              num_images: 1,
              image_size: quality === "final" ? "landscape_16_9" : "landscape_4_3",
              num_inference_steps: quality === "final" ? 28 : 4,
              guidance_scale: 3.5,
              enable_safety_checker: true,
            }, model);
          }
          
          if (result && (result as any).images && (result as any).images[0]) {
            const imageUrl = (result as any).images[0].url;
            
            // Store generation result for history
            await storeGenerationResult(
              convex,
              originalImageUrl,
              imageUrl,
              style,
              prompt,
              maskUrl,
              customPrompt
            );
            
            variations.push({
              url: imageUrl,
              seed: result.seed,
              prompt: prompt,
            });
          }
        } catch (genError) {
          console.error(`Failed to generate variation ${i}:`, genError);
          // Continue with other variations
        }
      }

      if (variations.length === 0) {
        throw new Error("No variations could be generated");
      }

      // Generate a share ID for this generation
      const shareId = uuidv4();

      return NextResponse.json({
        success: true,
        images: variations.map(v => v.url),
        variations: variations,
        style: style,
        generatedAt: new Date().toISOString(),
        originalImage: originalImageUrl,
        shareId: shareId,
      });

    } catch (apiError) {
      console.error("FAL API call failed:", apiError);
      
      // Return proper error message
      return NextResponse.json(
        { 
          error: "Failed to generate interior designs. Please try again.",
          details: apiError instanceof Error ? apiError.message : "Unknown error"
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate designs" },
      { status: 500 }
    );
  }
}

// GET endpoint for sharing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shareId = searchParams.get('id');
  
  if (!shareId) {
    return NextResponse.json({ error: "Share ID required" }, { status: 400 });
  }
  
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    // Get the shared generation from Convex
    const sharedData = await convex.query(api.interior.getSharedGeneration, {
      shareId,
    });
    
    if (!sharedData) {
      return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    }
    
    return NextResponse.json(sharedData);
  } catch (error) {
    console.error("Error fetching shared generation:", error);
    return NextResponse.json({ error: "Failed to fetch shared generation" }, { status: 500 });
  }
}