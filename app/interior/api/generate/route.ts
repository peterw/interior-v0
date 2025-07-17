import { NextRequest, NextResponse } from "next/server";

// In-memory storage for share links (in production, use database)
const shareCache = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;
    const style = formData.get("style") as string;
    const maskData = formData.get("mask") as string | null;
    const prompt = formData.get("prompt") as string | null;

    if (!imageFile || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const imageDataUrl = `data:${imageFile.type};base64,${imageBase64}`;

    // Style-specific prompts for different variations
    const stylePrompts: Record<string, string[]> = {
      "modern-minimalist": [
        "Modern minimalist interior with clean lines, neutral colors, and uncluttered spaces",
        "Sleek modern design with monochromatic palette and geometric shapes",
        "Contemporary minimal space with natural light and simple furniture",
        "Zen-inspired minimalist room with white walls and subtle textures"
      ],
      "cozy-scandinavian": [
        "Cozy Scandinavian interior with warm textiles and hygge atmosphere",
        "Nordic design with light wood, soft colors, and comfortable furniture",
        "Hygge-inspired space with candles, blankets, and natural materials",
        "Scandinavian room with white walls, wooden floors, and cozy textiles"
      ],
      "industrial-chic": [
        "Industrial chic interior with exposed brick, metal fixtures, and raw materials",
        "Urban loft style with concrete floors and vintage industrial elements",
        "Modern industrial space with steel beams and Edison bulb lighting",
        "Raw industrial design with metal furniture and weathered wood"
      ],
      "bohemian": [
        "Bohemian interior with colorful textiles, plants, and eclectic decor",
        "Free-spirited boho design with macrame, vintage rugs, and artistic elements",
        "Eclectic bohemian space with global influences and layered textures",
        "Vibrant boho room with mixed patterns, plants, and cultural artifacts"
      ],
      "traditional": [
        "Traditional elegant interior with rich textures and formal furniture",
        "Classic traditional design with ornate details and timeless pieces",
        "Formal traditional room with crown molding and sophisticated fabrics",
        "Refined traditional space with antique furniture and elegant lighting"
      ],
      "contemporary": [
        "Contemporary interior with current trends and sophisticated style",
        "Modern contemporary design with bold accents and clean aesthetics",
        "Stylish contemporary space with designer furniture and art pieces",
        "Fresh contemporary room with neutral base and colorful accents"
      ],
      "rustic": [
        "Rustic interior with natural wood, vintage pieces, and cozy charm",
        "Country rustic design with reclaimed wood and farmhouse elements",
        "Warm rustic space with stone accents and comfortable furniture",
        "Cabin-style rustic room with wooden beams and natural textures"
      ],
      "mid-century-modern": [
        "Mid-century modern interior with retro furniture and bold colors",
        "Vintage MCM design with organic curves and walnut wood furniture",
        "Retro mid-century space with geometric patterns and iconic pieces",
        "Classic MCM room with sunken living area and statement lighting"
      ],
      "luxury-glam": [
        "Luxury glam interior with opulent materials and metallic accents",
        "High-end glamorous design with velvet, marble, and gold details",
        "Sophisticated glam space with crystal chandeliers and plush furniture",
        "Dramatic luxury room with mirrored surfaces and jewel tones"
      ],
      "coastal-beach": [
        "Coastal beach interior with light colors and ocean-inspired decor",
        "Breezy beach house design with white-washed wood and nautical elements",
        "Serene coastal space with blue accents and natural textures",
        "Relaxed beach style room with driftwood, shells, and airy fabrics"
      ]
    };

    const prompts = stylePrompts[style] || stylePrompts["modern-minimalist"];
    const results: string[] = [];

    // Generate 4 variations using BFL API
    for (let i = 0; i < 4; i++) {
      const fullPrompt = prompt 
        ? `${prompt}. ${prompts[i]}` 
        : `Transform this room into: ${prompts[i]}`;

      try {
        const bflResponse = await fetch("https://api.bfl.ai/v1/flux-dev-realism", {
          method: "POST",
          headers: {
            "X-API-Key": process.env.FAL_API_KEY || "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: fullPrompt,
            image: imageDataUrl,
            width: 1024,
            height: 1024,
            prompt_upsampling: true,
            safety_tolerance: 6,
            seed: Math.floor(Math.random() * 1000000),
            guidance: 30,
            steps: 50,
            output_format: "jpeg",
            image_prompt_strength: 0.85,
            style_strength: 0.9,
          }),
        });

        if (!bflResponse.ok) {
          console.error(`BFL API error for variation ${i + 1}:`, bflResponse.status);
          throw new Error(`Failed to generate variation ${i + 1}`);
        }

        const data = await bflResponse.json();
        results.push(data.sample);
      } catch (error) {
        console.error(`Error generating variation ${i + 1}:`, error);
        // Use fallback image for failed generations
        results.push(`https://images.unsplash.com/photo-${1565183997392 + i}-2f6f122e5912?w=1024&h=1024&fit=crop`);
      }
    }

    // Create share ID and cache the data
    const shareId = Math.random().toString(36).substring(2, 15);
    const shareData = {
      id: shareId,
      originalImage: imageDataUrl,
      images: results,
      style,
      prompt: prompts[0],
      generatedAt: new Date().toISOString(),
    };
    
    shareCache.set(shareId, shareData);

    return NextResponse.json({
      images: results,
      shareId,
      originalImage: imageDataUrl,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate designs" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve share data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shareId = searchParams.get("id");

  if (!shareId) {
    return NextResponse.json(
      { error: "Share ID required" },
      { status: 400 }
    );
  }

  const shareData = shareCache.get(shareId);
  
  if (!shareData) {
    return NextResponse.json(
      { error: "Share link not found or expired" },
      { status: 404 }
    );
  }

  return NextResponse.json(shareData);
}