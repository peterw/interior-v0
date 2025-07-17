import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Convert the image file to buffer
    const imageBuffer = await image.arrayBuffer();
    
    // In a real implementation, you would:
    // 1. Upload the image to your storage service
    // 2. Generate a unique share ID
    // 3. Create a share record in your database
    // 4. Return the public share URL

    // Mock implementation
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/interior/share/${shareId}`;

    // Log the share creation (in production, this would be saved to database)
    console.log(`Created share link:`, {
      shareId,
      shareUrl,
      imageSize: imageBuffer.byteLength,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      shareId,
      shareUrl,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    });

  } catch (error) {
    console.error("Share edit error:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
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