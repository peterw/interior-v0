import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      
      // Upload the original image to a temporary hosting service
      // For now, we'll use the data URL directly
      // TODO: Upload to Convex storage or external service
      const originalImageUrl = imageDataUrl;
      
      // Generate final high-quality image
      const result = await convex.action(api.interior.generateFinal, {
        originalImageUrl,
        styleId: style,
        maskDataUrl,
        maskedAreaPrompt: maskPrompt || undefined,
      });

      if (!result || !result.id) {
        throw new Error("Failed to generate image");
      }

      // Poll for completion with non-blocking approach
      const pollGeneration = async (generationId: string, maxAttempts = 120) => {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const generation = await convex.query(api.interior.getGenerationStatus, {
            generationId,
          });
          
          if (generation?.status === "completed" || generation?.status === "failed") {
            return generation;
          }
          
          // Use setImmediate to avoid blocking the event loop
          await new Promise((resolve) => {
            setImmediate(() => {
              setTimeout(resolve, 1000);
            });
          });
        }
        return null;
      };

      const generation = await pollGeneration(result.id);
      
      if (!generation || generation.status !== "completed") {
        throw new Error(generation?.error || "Generation failed or timed out");
      }

      return NextResponse.json({
        success: true,
        image: generation.imageUrl,
        style: style,
        generatedAt: new Date().toISOString(),
        generationTime: generation.generationTime,
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