import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

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
    const maskImage = formData.get("maskImage") as File | null;
    const maskPrompt = formData.get("maskPrompt") as string | null;
    const tweakPrompt = formData.get("tweakPrompt") as string | null;
    const tweakIndex = formData.get("tweakIndex") as string | null;

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
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      
      // Upload the original image to a temporary hosting service
      // For now, we'll use the data URL directly
      // TODO: Upload to Convex storage or external service
      const originalImageUrl = imageDataUrl;
      
      // Generate variations
      const variations = [];
      const numVariations = tweakPrompt ? 1 : 4;

      // Generate each variation
      for (let i = 0; i < numVariations; i++) {
        try {
          // Add variation to the prompt for diversity
          let variationPrompt = maskPrompt;
          if (!maskPrompt && !tweakPrompt) {
            const variations = [
              "", // Use default style prompt
              "with warm ambient lighting",
              "with natural daylight",
              "with evening mood lighting"
            ];
            variationPrompt = variations[i % variations.length];
          }
          
          const result = await convex.action(api.interior.generatePreview, {
            originalImageUrl,
            styleId: style,
            maskDataUrl,
            maskedAreaPrompt: variationPrompt || tweakPrompt || undefined,
          });
          
          if (result && result.imageUrl) {
            variations.push(result.imageUrl);
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
        images: variations,
        style: style,
        generatedAt: new Date().toISOString(),
        originalImage: imageDataUrl,
        shareId: shareId,
      });

    } catch (apiError) {
      console.error("API call failed:", apiError);
      
      // Return proper error message without fallback images
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