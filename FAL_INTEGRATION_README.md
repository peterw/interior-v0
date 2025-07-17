# FAL.AI Integration for Interior Design

This document describes the FAL.AI integration implemented in the Interior Design API route.

## Overview

The integration uses FAL.AI's image generation models to transform room photos into different interior design styles. It supports both full image transformation and masked area editing (inpainting).

## API Endpoint

`POST /app/(protected-views)/interior/api/generate`

### Request Format

The endpoint accepts `multipart/form-data` with the following fields:

- `image` (required): The original room image file
- `style` (required): Interior design style ID (e.g., "modern-minimalist", "cozy-scandinavian")
- `maskImage` (optional): Black and white mask image for inpainting
- `maskPrompt` (optional): Description of what to generate in the masked area
- `tweakPrompt` (optional): Specific modification request
- `roomType` (optional): Type of room (living_room, bedroom, kitchen, etc.)
- `quality` (optional): Generation quality - "fast", "preview", or "final" (default: "preview")

### Response Format

```json
{
  "success": true,
  "images": ["url1", "url2", "url3", "url4"],
  "variations": [
    {
      "url": "https://...",
      "seed": 123456,
      "prompt": "full prompt used"
    }
  ],
  "style": "modern-minimalist",
  "generatedAt": "2024-01-20T10:30:00Z",
  "originalImage": "data:image/...",
  "shareId": "uuid-v4-string"
}
```

## Features Implemented

### 1. Style Transfer
- Transforms entire room images into different interior design styles
- Uses FAL models based on quality setting:
  - `fal-ai/fast-sdxl` - Fast preview (4 steps)
  - `fal-ai/flux/schnell` - Balanced quality/speed
  - `fal-ai/flux/dev` - High quality (28 steps)

### 2. Inpainting (Masked Editing)
- Edit specific areas of a room using mask images
- Uses `fal-ai/flux/dev/image-to-image` for masked areas
- Higher strength (0.95) for better adherence to prompts

### 3. Multiple Variations
- Generates 4 variations by default with different lighting:
  - Default style
  - Warm ambient lighting
  - Natural daylight
  - Evening mood lighting
- Single variation for tweak requests

### 4. Retry Logic
- Automatic retry with exponential backoff
- Up to 3 attempts per generation
- Handles temporary API failures gracefully

### 5. Error Handling
- Validates file size (max 10MB)
- Validates file types (JPEG, PNG, WebP)
- Checks authentication
- Verifies FAL API key configuration
- Returns user-friendly error messages

## Supported Styles

The following interior design styles are configured with optimized prompts:

1. **modern-minimalist** - Clean lines, neutral colors, minimal furniture
2. **cozy-scandinavian** - Hygge atmosphere, light wood, soft textiles
3. **luxury-modern** - High-end materials, marble, gold accents
4. **rustic-farmhouse** - Reclaimed wood, vintage decor, warm colors
5. **industrial-chic** - Exposed brick, metal fixtures, urban loft
6. **bohemian-eclectic** - Colorful textiles, mixed patterns, plants
7. **classic-traditional** - Elegant furniture, rich wood, formal decor
8. **coastal-beach** - Light blue and white, nautical decor
9. **mid-century-modern** - Retro furniture, geometric patterns
10. **zen-japanese** - Minimalist, natural materials, peaceful

## Model Configuration

### Image Sizes
- Fast/Preview: `landscape_4_3` (1024x768)
- Final: `landscape_16_9` (1920x1080)

### Generation Parameters
- **Strength**: 0.85 (style transfer), 0.95 (inpainting)
- **Guidance Scale**: 3.5 (style transfer), 7.5 (inpainting)
- **Inference Steps**: 4 (fast), 28 (final)
- **Safety Checker**: Always enabled

## Security Considerations

1. **Authentication**: Requires valid `accessToken` cookie
2. **File Validation**: Size and type restrictions
3. **API Key**: Stored in environment variable `FAL_API_KEY`
4. **Data URLs**: Currently used for simplicity, should use CDN in production

## Future Improvements

1. **CDN Upload**: Replace data URLs with proper CDN storage
2. **Convex Integration**: Store generation history in database
3. **Progress Updates**: Use FAL's queue updates for real-time progress
4. **Webhook Support**: For async processing of large batches
5. **Cost Tracking**: Monitor API usage and implement credit system
6. **Style Learning**: Allow users to create custom styles from reference images

## Testing

To test the FAL integration:

```bash
# Set your FAL API key
export FAL_API_KEY=your-key-here

# Run the test script
npx tsx test-fal.ts
```

## Error Codes

- `401`: Unauthorized (missing authentication)
- `400`: Bad request (missing required fields, invalid file)
- `500`: Server error (FAL API issues, configuration problems)

## Performance Notes

- Fast mode: ~2-5 seconds per image
- Preview mode: ~5-10 seconds per image
- Final mode: ~15-30 seconds per image
- Variations are generated in parallel when possible