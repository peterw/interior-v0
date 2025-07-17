import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Check authentication using cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { originalImage, generatedImage, style } = await request.json();

    if (!originalImage || !generatedImage) {
      return NextResponse.json(
        { error: "Both original and generated images are required" },
        { status: 400 }
      );
    }

    // Since server-side Remotion rendering is not compatible with Next.js API routes,
    // we return the props for client-side rendering
    return NextResponse.json({
      success: true,
      requiresClientRendering: true,
      renderProps: {
        beforeImage: originalImage,
        afterImage: generatedImage,
        styleName: style || "Modern Design",
      },
      message: "Use client-side export to generate video",
    });

  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate video reel" },
      { status: 500 }
    );
  }
}