/**
 * Canvas Edit API Route
 * 
 * This route handles real-time canvas editing with mask support.
 * It's designed for quick edits and preview generation.
 * 
 * For full mask-based generation, use the /api/canvas route instead.
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fal } from "@fal-ai/client";

// Configure FAL with API key
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const originalImage = formData.get('originalImage') as string;
    const maskDataUrl = formData.get('maskDataUrl') as string | null;

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Image and prompt are required" },
        { status: 400 }
      );
    }

    // Verify FAL API key
    if (!process.env.FAL_API_KEY) {
      console.error("FAL_API_KEY is not configured");
      // Return mock response for development
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({
        success: true,
        editedImage: originalImage,
        prompt,
        processingTime: 2000,
        isMock: true,
      });
    }

    try {
      // Convert the image file to base64 for processing
      const imageBuffer = await image.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString('base64');
      const imageDataUrl = `data:${image.type};base64,${imageBase64}`;

      // Use FAL for quick edit
      const result = await fal.subscribe("fal-ai/fast-sdxl", {
        input: {
          prompt: `${prompt}, professional interior photography, high quality`,
          image_url: imageDataUrl,
          mask_url: maskDataUrl || undefined,
          strength: maskDataUrl ? 0.95 : 0.85,
          num_images: 1,
          num_inference_steps: 4,
          guidance_scale: 3.5,
          enable_safety_checker: true,
        },
        logs: true,
        onQueueUpdate: (update) => {
          console.log("Canvas quick edit update:", update);
        },
      });

      const resultAny = result as any;
      if (!resultAny || !resultAny.images || resultAny.images.length === 0) {
        throw new Error("No image generated");
      }

      return NextResponse.json({
        success: true,
        editedImage: resultAny.images[0].url,
        prompt,
        processingTime: resultAny.inference_time || 2000,
      });

    } catch (apiError) {
      console.error("FAL API error:", apiError);
      
      // Fallback to mock response
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({
        success: true,
        editedImage: originalImage,
        prompt,
        processingTime: 2000,
        isMock: true,
        error: apiError instanceof Error ? apiError.message : "API error",
      });
    }

  } catch (error) {
    console.error("Canvas edit error:", error);
    return NextResponse.json(
      { error: "Failed to process canvas edit" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}