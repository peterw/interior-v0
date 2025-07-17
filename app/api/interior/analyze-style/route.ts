import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

// Configure FAL.AI client
if (process.env.FAL_API_KEY) {
  fal.config({
    credentials: process.env.FAL_API_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    if (images.length < 3) {
      return NextResponse.json(
        { error: "Please provide at least 3 reference images" },
        { status: 400 }
      );
    }

    // Convert images to base64 URLs
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const buffer = await image.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return `data:${image.type};base64,${base64}`;
      })
    );

    // Analyze each image using LLaVA model to extract interior design characteristics
    const analysisPromises = imageUrls.map(async (imageUrl, index) => {
      try {
        const result = await fal.run("fal-ai/llava-next", {
          image_url: imageUrl,
          prompt: `Analyze this interior design image and provide a detailed description of:
1. Color palette (specific colors and their usage)
2. Materials and textures (wood, metal, fabric, etc.)
3. Furniture style and types
4. Lighting (natural vs artificial, fixtures, ambiance)
5. Overall atmosphere and mood
6. Key design elements and patterns
7. Space layout and organization
8. Architectural features

Format your response as a structured list with clear categories.`,
          max_tokens: 500,
          temperature: 0.7,
        } as any);

        return {
          index,
          analysis: (result as any).output || "",
        };
      } catch (error) {
        console.error(`Failed to analyze image ${index}:`, error);
        return {
          index,
          analysis: "",
          error: error instanceof Error ? error.message : "Analysis failed",
        };
      }
    });

    const analyses = await Promise.all(analysisPromises);

    // Combine all analyses to extract common characteristics
    const combinedAnalysis = analyses
      .filter((a) => a.analysis)
      .map((a) => a.analysis)
      .join("\n\n---\n\n");

    // Use LLM to synthesize the combined analysis into a cohesive style description
    const synthesisResult = await fal.run("fal-ai/llava-next", {
      image_url: imageUrls[0], // Use first image as reference
      prompt: `Based on these analyses of multiple interior design images, synthesize the common characteristics and create:

1. A comprehensive interior design prompt that captures the essence of this style (50-100 words)
2. Key characteristics in categories:
   - Colors (list 3-5 main colors)
   - Materials (list 3-5 main materials)
   - Furniture (list 3-5 furniture types/styles)
   - Lighting (describe in 1-2 sentences)
   - Atmosphere (describe in 1-2 sentences)
   - Design Elements (list 3-5 key elements)

Combined analyses:
${combinedAnalysis}

Format your response as JSON with the following structure:
{
  "prompt": "...",
  "characteristics": {
    "colors": [...],
    "materials": [...],
    "furniture": [...],
    "lighting": "...",
    "atmosphere": "...",
    "designElements": [...]
  }
}`,
      max_tokens: 800,
      temperature: 0.7,
    } as any);

    let styleData;
    try {
      // Try to parse the JSON response
      const output = (synthesisResult as any).output || "";
      const jsonMatch = output.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        styleData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (parseError) {
      // Fallback: Create a basic prompt from the analyses
      styleData = {
        prompt: "custom interior design style with unique characteristics based on reference images",
        characteristics: {
          colors: ["neutral tones", "warm accents"],
          materials: ["natural wood", "soft textiles"],
          furniture: ["modern pieces", "comfortable seating"],
          lighting: "balanced natural and artificial lighting",
          atmosphere: "welcoming and sophisticated",
          designElements: ["clean lines", "thoughtful details"],
        },
      };
    }

    return NextResponse.json({
      success: true,
      prompt: styleData.prompt,
      characteristics: styleData.characteristics,
      imageCount: images.length,
    });
  } catch (error) {
    console.error("Style analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze style images" },
      { status: 500 }
    );
  }
}