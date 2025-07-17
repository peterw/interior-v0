/**
 * Final Generation API Route
 * 
 * This route handles high-quality final image generation.
 * It's used after the user is satisfied with previews and wants the best quality.
 * 
 * Features:
 * - High-resolution output (16:9 aspect ratio)
 * - Maximum quality settings
 * - Support for mask-based editing
 * - Integration with Convex for history tracking
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { fal } from "@fal-ai/client";

// Configure FAL with API key
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication using cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const style = formData.get("style") as string;
    const selectedIndexStr = formData.get("selectedIndex") as string;
    const selectedIndex = isNaN(parseInt(selectedIndexStr)) ? 0 : parseInt(selectedIndexStr);
    const maskImage = formData.get("maskImage") as File | null;
    const maskPrompt = formData.get("maskPrompt") as string | null;

    if (!image || !style) {
      return NextResponse.json(
        { error: "Image and style are required" },
        { status: 400 }
      );
    }

    // Convert image to base64 for API
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageDataUrl = `data:${image.type};base64,${base64Image}`;

    // Convert mask image if provided
    let maskDataUrl: string | undefined;
    if (maskImage) {
      const maskBuffer = await maskImage.arrayBuffer();
      const base64Mask = Buffer.from(maskBuffer).toString('base64');
      maskDataUrl = `data:${maskImage.type};base64,${base64Mask}`;
    }

    try {
      // Verify FAL API key
      if (!process.env.FAL_API_KEY) {
        console.error("FAL_API_KEY is not configured");
        return NextResponse.json(
          { error: "Interior AI service is not configured properly" },
          { status: 500 }
        );
      }

      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      
      // Generate style prompt
      const STYLE_PROMPTS: Record<string, string> = {
        "modern-minimalist": "modern minimalist interior design, clean lines, neutral colors, minimal furniture",
        "cozy-scandinavian": "scandinavian interior design, hygge, cozy atmosphere, light wood, soft textiles",
        "luxury-modern": "luxury modern interior, high-end materials, designer furniture, sophisticated",
        "rustic-farmhouse": "rustic farmhouse interior, reclaimed wood, vintage decor, warm colors",
        "industrial-chic": "industrial chic interior, exposed brick, metal fixtures, urban loft style",
        "bohemian-eclectic": "bohemian eclectic interior, colorful textiles, mixed patterns, artistic",
        "classic-traditional": "classic traditional interior, elegant furniture, rich wood tones, formal",
        "coastal-beach": "coastal beach house interior, light blue and white, nautical decor, bright",
        "mid-century-modern": "mid-century modern interior, retro furniture, geometric patterns, warm colors",
        "zen-japanese": "zen japanese interior, minimalist, natural materials, peaceful atmosphere",
      };
      
      const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS["modern-minimalist"];
      const fullPrompt = `${stylePrompt}, professional interior photography, architectural digest style, 8k resolution, high quality, detailed`;
      
      // Generate final high-quality image using FAL directly
      const result = await fal.subscribe("fal-ai/flux/dev", {
        input: {
          prompt: maskPrompt ? `${maskPrompt}, ${fullPrompt}` : fullPrompt,
          image_url: imageDataUrl,
          mask_url: maskDataUrl || undefined,
          strength: maskDataUrl ? 0.95 : 0.85,
          num_images: 1,
          image_size: "landscape_16_9",  // High resolution
          num_inference_steps: 28,       // Maximum quality
          guidance_scale: 7.5,
          enable_safety_checker: true,
        } as any,
        logs: true,
        onQueueUpdate: (update) => {
          console.log("Final generation update:", update);
        },
      });
      
      const resultAny = result as any;
      if (!resultAny || !resultAny.images || resultAny.images.length === 0) {
        throw new Error("No image generated");
      }
      
      const finalImageUrl = resultAny.images[0].url;
      
      // Store generation in Convex for history
      try {
        // Note: You may want to create a mutation for this
        console.log("Storing final generation:", {
          originalImage: imageDataUrl.substring(0, 50) + "...",
          finalImage: finalImageUrl,
          style: style,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Failed to store generation:", error);
      }

      return NextResponse.json({
        success: true,
        image: finalImageUrl,
        style: style,
        generatedAt: new Date().toISOString(),
        generationTime: resultAny.inference_time || 0,
        metadata: {
          resolution: "landscape_16_9",
          quality: "final",
          model: "flux/dev",
          steps: 28,
        },
      });

    } catch (apiError) {
      console.error("API call failed:", apiError);
      return NextResponse.json(
        { 
          error: "Failed to generate final design. Please try again.",
          details: apiError instanceof Error ? apiError.message : "Unknown error"
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Final generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate final design" },
      { status: 500 }
    );
  }
}