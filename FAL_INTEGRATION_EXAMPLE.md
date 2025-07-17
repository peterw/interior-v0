# FAL AI Integration Example for Interior AI

This document provides specific examples of how to integrate FAL AI into the Interior AI application.

## 1. Basic Setup

### Install FAL Client (already installed)
```bash
npm install @fal-ai/client
```

### Configure FAL in your API route
```typescript
// app/(protected-views)/interior/api/generate/route.ts
import * as fal from "@fal-ai/client";

// Configure FAL with your API key
fal.config({
  credentials: process.env.FAL_KEY,
});
```

## 2. Interior Design Generation Example

### Simple Generation
```typescript
export async function POST(request: Request) {
  try {
    const { imageUrl, style, roomType } = await request.json();

    // Generate style prompt based on selected style
    const stylePrompt = generateStylePrompt(style, roomType);

    // Call FAL AI for interior generation
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: stylePrompt,
        image_url: imageUrl,
        strength: 0.85, // How much to change the image (0-1)
        num_images: 1,
        image_size: "landscape_16_9",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        enable_safety_checker: true,
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("Queue update:", update);
      },
    });

    return Response.json({
      success: true,
      imageUrl: result.images[0].url,
      seed: result.seed,
    });
  } catch (error) {
    console.error("FAL generation error:", error);
    return Response.json(
      { success: false, error: "Generation failed" },
      { status: 500 }
    );
  }
}
```

### Advanced Generation with Masking
```typescript
// For masked editing (inpainting)
const maskedResult = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
  input: {
    prompt: "modern minimalist sofa in living room",
    image_url: originalImageUrl,
    mask_url: maskImageUrl, // Black and white mask
    strength: 0.95,
    num_images: 1,
    enable_safety_checker: true,
  },
});
```

## 3. Style Prompt Generation

```typescript
function generateStylePrompt(style: string, roomType: string): string {
  const basePrompts = {
    modern: "modern contemporary interior design, clean lines, minimal decoration",
    rustic: "rustic farmhouse interior, wooden beams, natural materials, cozy atmosphere",
    minimalist: "minimalist interior design, white walls, simple furniture, lots of natural light",
    industrial: "industrial loft interior, exposed brick, metal fixtures, concrete floors",
    scandinavian: "scandinavian interior design, hygge, white and wood, cozy textiles",
    bohemian: "bohemian eclectic interior, colorful textiles, plants, vintage furniture",
    traditional: "traditional classic interior design, elegant furniture, ornate details",
    mediterranean: "mediterranean villa interior, terracotta, arches, warm colors",
  };

  const roomDescriptions = {
    living_room: "living room with comfortable seating area",
    bedroom: "bedroom with bed and nightstands",
    kitchen: "kitchen with modern appliances and cabinets",
    bathroom: "bathroom with modern fixtures",
    office: "home office with desk and shelving",
  };

  return `${basePrompts[style] || basePrompts.modern}, ${
    roomDescriptions[roomType] || "interior space"
  }, professional interior photography, high quality, 8k resolution`;
}
```

## 4. Handling Different FAL Models

### Fast Preview Generation
```typescript
// Use fast model for quick previews
const previewResult = await fal.subscribe("fal-ai/fast-sdxl", {
  input: {
    prompt: stylePrompt,
    image_url: imageUrl,
    strength: 0.8,
    num_images: 1,
    enable_safety_checker: true,
  },
});
```

### High Quality Generation
```typescript
// Use Flux for high quality
const hqResult = await fal.subscribe("fal-ai/flux/pro", {
  input: {
    prompt: stylePrompt,
    image_url: imageUrl,
    strength: 0.85,
    num_images: 1,
    guidance_scale: 3.5,
    num_inference_steps: 50, // More steps = better quality
    enable_safety_checker: true,
  },
});
```

### Style Transfer
```typescript
// Use Recraft for style transfer
const styleResult = await fal.subscribe("fal-ai/recraft-v3", {
  input: {
    prompt: stylePrompt,
    image_url: imageUrl,
    style: "realistic_image",
    style_id: style_reference_id, // Optional style reference
  },
});
```

## 5. Error Handling and Retry Logic

```typescript
async function generateWithRetry(input: any, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await fal.subscribe("fal-ai/flux/dev", {
        input,
        logs: true,
      });
      
      if (result.images && result.images.length > 0) {
        return result;
      }
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw lastError;
}
```

## 6. Webhook Integration (for async processing)

```typescript
// For long-running generations
const result = await fal.queue.submit("fal-ai/flux/dev", {
  input: {
    prompt: stylePrompt,
    image_url: imageUrl,
    // ... other parameters
  },
  webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/interior/webhook`,
});

// Return queue ID to client
return Response.json({
  success: true,
  queueId: result.request_id,
});

// In webhook handler
export async function POST(request: Request) {
  const data = await request.json();
  
  // Update database with result
  await updateGenerationResult(data.request_id, data.images[0].url);
  
  return Response.json({ received: true });
}
```

## 7. Client-Side Integration

```typescript
// In useInteriorAI.tsx
const generateDesign = async (file: File, style: string) => {
  // Upload image first
  const imageUrl = await uploadImage(file);
  
  // Call generation API
  const response = await fetch("/api/interior/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageUrl,
      style,
      roomType: detectedRoomType,
    }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Save to history
    await saveToHistory(data.imageUrl, style);
    return data.imageUrl;
  }
  
  throw new Error(data.error || "Generation failed");
};
```

## 8. Cost Optimization

```typescript
// Track usage and costs
interface GenerationCost {
  model: string;
  credits: number;
}

const modelCosts: Record<string, GenerationCost> = {
  "fal-ai/fast-sdxl": { model: "fast", credits: 1 },
  "fal-ai/flux/dev": { model: "standard", credits: 3 },
  "fal-ai/flux/pro": { model: "premium", credits: 5 },
};

// Check credits before generation
async function checkAndDeductCredits(userId: string, model: string) {
  const cost = modelCosts[model];
  const user = await getUser(userId);
  
  if (user.credits < cost.credits) {
    throw new Error("Insufficient credits");
  }
  
  await deductCredits(userId, cost.credits);
  return true;
}
```

## 9. Testing FAL Integration

Create a test file to verify FAL is working:

```typescript
// test-fal.ts
import * as fal from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

async function testFAL() {
  try {
    const result = await fal.subscribe("fal-ai/fast-sdxl", {
      input: {
        prompt: "modern living room interior design",
        image_size: "landscape_16_9",
        num_images: 1,
      },
    });
    
    console.log("Success!", result.images[0].url);
  } catch (error) {
    console.error("FAL test failed:", error);
  }
}

testFAL();
```

Run with: `npx tsx test-fal.ts`

## Important Notes

1. **API Key Security**: Never expose FAL_KEY on client side
2. **Image URLs**: Must be publicly accessible for FAL to process
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Caching**: Cache generated images to reduce API calls
5. **Error Messages**: Provide user-friendly error messages
6. **Progress Updates**: Use onQueueUpdate for real-time progress
7. **Model Selection**: Choose model based on speed/quality needs