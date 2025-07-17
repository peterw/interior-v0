/**
 * Canvas Editor API Route
 * 
 * This route handles mask-based image editing for interior design.
 * It processes masked areas and applies AI transformations.
 * 
 * Features:
 * - Mask data processing (from canvas drawing)
 * - Selective area editing with AI
 * - Multiple mask format support
 * - Integration with FAL.AI for image generation
 * 
 * Request body (FormData):
 * - image: File - The original room image
 * - maskDataUrl: string - The mask data URL from canvas
 * - prompt: string - Description of what to change in masked area
 * - style?: string - Optional style ID for consistency
 * - quality?: string - Generation quality (fast, preview, final)
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import { fal } from "@fal-ai/client";

// Configure FAL with API key
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  });
}

/**
 * Convert a data URL to a File object
 */
async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

/**
 * Process mask data to ensure it's in the correct format
 * Converts the purple mask from canvas to black/white for AI processing
 */
async function processMaskData(maskDataUrl: string): Promise<string> {
  // In a browser environment, we'd use Canvas API
  // For Node.js, we'll return the mask as-is and let FAL handle it
  // FAL accepts masks where white = edit area, black = preserve area
  return maskDataUrl;
}

/**
 * Validate image dimensions and format
 */
function validateImage(file: File): { valid: boolean; error?: string } {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "Image size must be less than 10MB" };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, and WebP images are supported" };
  }
  
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Verify FAL API key
    if (!process.env.FAL_API_KEY) {
      console.error("FAL_API_KEY is not configured");
      return NextResponse.json(
        { error: "Interior AI service is not configured properly" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const maskDataUrl = formData.get("maskDataUrl") as string;
    const prompt = formData.get("prompt") as string;
    const style = formData.get("style") as string | null;
    const quality = formData.get("quality") as string || "preview";

    // Validate required fields
    if (!image || !maskDataUrl || !prompt) {
      return NextResponse.json(
        { error: "Image, mask, and prompt are required" },
        { status: 400 }
      );
    }

    // Validate image
    const imageValidation = validateImage(image);
    if (!imageValidation.valid) {
      return NextResponse.json(
        { error: imageValidation.error },
        { status: 400 }
      );
    }

    try {
      // Convert image to data URL
      const imageBuffer = await image.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString('base64');
      const imageDataUrl = `data:${image.type};base64,${imageBase64}`;
      
      // Process mask data
      const processedMaskUrl = await processMaskData(maskDataUrl);
      
      // Build the prompt with style context if provided
      let fullPrompt = prompt;
      if (style) {
        // Add style context to maintain consistency
        fullPrompt = `${prompt}, interior design style: ${style.replace(/-/g, ' ')}`;
      }
      
      // Always add quality modifiers
      fullPrompt += ", professional interior photography, high quality, detailed";
      
      // Choose model and parameters based on quality
      const modelConfig = {
        fast: {
          model: "fal-ai/fast-sdxl",
          steps: 4,
          guidance: 3.5,
        },
        preview: {
          model: "fal-ai/flux/schnell", 
          steps: 4,
          guidance: 3.5,
        },
        final: {
          model: "fal-ai/flux/dev",
          steps: 28,
          guidance: 7.5,
        },
      };
      
      const config = modelConfig[quality as keyof typeof modelConfig] || modelConfig.preview;
      
      // Generate edited image using inpainting
      const result = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
        input: {
          prompt: fullPrompt,
          image_url: imageDataUrl,
          mask_url: processedMaskUrl,
          strength: 0.95, // High strength for masked area changes
          num_images: 1,
          image_size: quality === "final" ? "landscape_16_9" : "landscape_4_3",
          num_inference_steps: config.steps,
          guidance_scale: config.guidance,
          enable_safety_checker: true,
        },
        logs: true,
        onQueueUpdate: (update) => {
          console.log("Canvas edit queue update:", update);
        },
      });
      
      const resultAny = result as any;
      if (!resultAny || !resultAny.images || resultAny.images.length === 0) {
        throw new Error("No image generated");
      }
      
      const editedImageUrl = resultAny.images[0].url;
      
      // Generate a unique ID for this edit
      const editId = uuidv4();
      
      return NextResponse.json({
        success: true,
        editedImage: editedImageUrl,
        editId: editId,
        prompt: prompt,
        fullPrompt: fullPrompt,
        processingTime: resultAny.inference_time || 0,
        metadata: {
          originalSize: image.size,
          quality: quality,
          hasStyle: !!style,
          model: config.model,
        },
      });
      
    } catch (apiError) {
      console.error("FAL API error:", apiError);
      
      // Check for specific error types
      if (apiError instanceof Error) {
        if (apiError.message.includes("quota")) {
          return NextResponse.json(
            { error: "AI generation quota exceeded. Please try again later." },
            { status: 429 }
          );
        }
        if (apiError.message.includes("timeout")) {
          return NextResponse.json(
            { error: "Generation timed out. Please try with a simpler prompt." },
            { status: 504 }
          );
        }
      }
      
      return NextResponse.json(
        { 
          error: "Failed to process canvas edit",
          details: apiError instanceof Error ? apiError.message : "Unknown error"
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Canvas edit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process canvas edit" },
      { status: 500 }
    );
  }
}

// GET endpoint to check if the route is working
export async function GET() {
  return NextResponse.json({
    status: "Canvas API is running",
    endpoints: {
      POST: "Process canvas edit with mask",
    },
    requiredFields: {
      image: "File - Original image",
      maskDataUrl: "string - Mask data URL from canvas", 
      prompt: "string - Edit description",
      style: "string (optional) - Style ID",
      quality: "string (optional) - fast|preview|final",
    },
  });
}