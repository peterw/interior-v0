import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

// Configure FAL client with API key
fal.config({
  credentials: process.env.FAL_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    // Check if FAL API key is configured
    if (!process.env.FAL_API_KEY) {
      return NextResponse.json(
        { error: "FAL API key not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const prompt = formData.get('prompt') as string;
    const originalImage = formData.get('originalImage') as string;
    const maskFile = formData.get('mask') as File;
    const maskedImageFile = formData.get('maskedImage') as File;

    if (!prompt || !originalImage || !maskFile || !maskedImageFile) {
      return NextResponse.json(
        { error: "Prompt, original image, mask, and masked image are required" },
        { status: 400 }
      );
    }

    // Validate original image URL format
    if (!originalImage.startsWith('http') && !originalImage.startsWith('data:')) {
      return NextResponse.json(
        { error: "Original image must be a valid URL or data URL" },
        { status: 400 }
      );
    }

    console.log("Processing multi-image flux-pro generation request:", {
      prompt,
      originalImage: originalImage.substring(0, 100) + "...",
      hasMaskFile: !!maskFile,
      hasMaskedImageFile: !!maskedImageFile
    });

    // Upload the masked image to get a URL for the API
    const maskedImageBuffer = await maskedImageFile.arrayBuffer();
    const maskedImageBase64 = Buffer.from(maskedImageBuffer).toString('base64');
    const maskedImageDataUrl = `data:image/png;base64,${maskedImageBase64}`;

    // Create enhanced prompt for better results
    const enhancedPrompt = `you are going to be given an original image, a subset of the image and a prompt to adjust the subset to look like. Output a final image that is the original image with the subset replaced with the adjusted subset. The adjustment prompt is: ${prompt}`

    console.log("Starting FAL AI flux-pro multi-image generation...");
    console.log("Enhanced prompt:", enhancedPrompt);
    
    // Call FAL AI flux-pro multi-image service
    const result = await fal.subscribe("fal-ai/flux-pro/kontext/max/multi", {
      input: {
        prompt: enhancedPrompt,
        image_urls: [originalImage, maskedImageDataUrl]
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log("Flux-pro multi-image generation result:", result.data);
    console.log("Request ID:", result.requestId);

    // Extract the generated image URL from the result
    let editedImage = originalImage; // fallback to original
    
    if (result.data && result.data.images && result.data.images.length > 0) {
      editedImage = result.data.images[0].url;
    }

    return NextResponse.json({
      success: true,
      editedImage,
      prompt: enhancedPrompt,
      requestId: result.requestId,
      processingTime: Date.now(),
    });

  } catch (error) {
    console.error("Canvas edit error:", error);
    
    // Provide more detailed error information
    let errorMessage = "Failed to process canvas edit";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      },
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