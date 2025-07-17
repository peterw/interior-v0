/**
 * Save Edit API Route
 * 
 * This route handles saving edited images with metadata.
 * It supports both full image edits and mask-based edits.
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const editedImage = formData.get('editedImage') as File;
    const originalImageId = formData.get('originalImageId') as string;
    const editType = formData.get('editType') as string || 'full';
    const maskDataUrl = formData.get('maskDataUrl') as string | null;
    const prompt = formData.get('prompt') as string | null;
    const style = formData.get('style') as string | null;

    if (!editedImage || !originalImageId) {
      return NextResponse.json(
        { error: "Edited image and original image ID are required" },
        { status: 400 }
      );
    }

    // Convert the image file to buffer for storage
    const imageBuffer = await editedImage.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageDataUrl = `data:${editedImage.type};base64,${base64Image}`;
    
    try {
      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      
      // In a production environment, you would:
      // 1. Upload the image to cloud storage (S3, Cloudinary, etc.)
      // 2. Get a permanent URL
      // 3. Store the metadata in your database
      
      // For now, we'll store metadata only
      const editMetadata = {
        id: `edit_${Date.now()}`,
        originalImageId,
        editType,
        style: style || undefined,
        prompt: prompt || undefined,
        hasMask: !!maskDataUrl,
        createdAt: new Date().toISOString(),
        fileSize: imageBuffer.byteLength,
        // In production, this would be the cloud storage URL
        editedImageUrl: imageDataUrl.substring(0, 100) + '...', // Truncate for logging
      };
      
      // Log the save operation
      console.log('Saving edit:', {
        ...editMetadata,
        maskPreview: maskDataUrl ? maskDataUrl.substring(0, 50) + '...' : null,
      });
      
      // TODO: Create a Convex mutation to store edit history
      // await convex.mutation(api.interior.saveEdit, editMetadata);

      return NextResponse.json({
        success: true,
        edit: {
          ...editMetadata,
          editedImageUrl: imageDataUrl, // Return full URL for immediate use
        },
      });

    } catch (storageError) {
      console.error("Storage error:", storageError);
      return NextResponse.json(
        { error: "Failed to save edit to storage" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Save edit error:", error);
    return NextResponse.json(
      { error: "Failed to save edit" },
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