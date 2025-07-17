# Canvas Editor API Documentation

## Overview

The Canvas Editor API provides mask-based image editing functionality for interior design transformations. It allows users to draw masks on images to select specific areas for AI-powered editing.

## API Endpoints

### 1. `/api/canvas` - Main Canvas Editing Endpoint

**Method:** POST

**Purpose:** Process mask-based image edits with AI

**Request (FormData):**
- `image` (File, required) - The original room image
- `maskDataUrl` (string, required) - The mask data URL from canvas (PNG format)
- `prompt` (string, required) - Description of what to change in masked area
- `style` (string, optional) - Interior design style ID for consistency
- `quality` (string, optional) - Generation quality: "fast" | "preview" | "final"

**Response:**
```json
{
  "success": true,
  "editedImage": "https://...", // URL of edited image
  "editId": "uuid",
  "prompt": "user prompt",
  "fullPrompt": "enhanced prompt with style",
  "processingTime": 2000,
  "metadata": {
    "originalSize": 1024000,
    "quality": "preview",
    "hasStyle": true,
    "model": "flux/schnell"
  }
}
```

### 2. `/api/canvas-edit` - Quick Edit Endpoint

**Method:** POST

**Purpose:** Fast preview edits with lower quality for real-time feedback

**Request (FormData):**
- `image` (File, required) - The image to edit
- `prompt` (string, required) - Edit description
- `originalImage` (string, optional) - Original image URL
- `maskDataUrl` (string, optional) - Mask data URL

**Response:**
```json
{
  "success": true,
  "editedImage": "https://...",
  "prompt": "user prompt",
  "processingTime": 2000,
  "isMock": false // true if using mock data
}
```

### 3. `/api/generate-final` - Final Generation Endpoint

**Method:** POST

**Purpose:** Generate high-quality final images after preview approval

**Request (FormData):**
- `image` (File, required) - The image to process
- `style` (string, required) - Interior design style ID
- `selectedIndex` (string, optional) - Selected variation index
- `maskImage` (File, optional) - Mask image file
- `maskPrompt` (string, optional) - Prompt for masked area

**Response:**
```json
{
  "success": true,
  "image": "https://...",
  "style": "modern-minimalist",
  "generatedAt": "2024-01-01T00:00:00Z",
  "generationTime": 5000,
  "metadata": {
    "resolution": "landscape_16_9",
    "quality": "final",
    "model": "flux/dev",
    "steps": 28
  }
}
```

### 4. `/api/save-edit` - Save Edit Endpoint

**Method:** POST

**Purpose:** Save edited images with metadata for history tracking

**Request (FormData):**
- `editedImage` (File, required) - The edited image to save
- `originalImageId` (string, required) - ID of the original image
- `editType` (string, optional) - Type of edit: "full" | "mask"
- `maskDataUrl` (string, optional) - Mask used for editing
- `prompt` (string, optional) - Edit prompt
- `style` (string, optional) - Style used

**Response:**
```json
{
  "success": true,
  "edit": {
    "id": "edit_1234567890",
    "originalImageId": "img_123",
    "editType": "mask",
    "style": "modern-minimalist",
    "prompt": "Add chandelier",
    "hasMask": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "fileSize": 1024000,
    "editedImageUrl": "data:image/..."
  }
}
```

## Mask Format

The mask should be a PNG data URL where:
- **White pixels (255,255,255)** = Areas to edit
- **Black pixels (0,0,0)** = Areas to preserve
- **Transparency** is converted to black (preserve)

The canvas component automatically handles purple mask drawing and converts it to the correct format.

## Utility Functions

### Mask Processing Utilities (`/lib/utils/canvas/mask-utils.ts`)

1. **`convertToBlackWhiteMask(maskDataUrl, invertMask?)`**
   - Converts colored masks to black/white format
   - Optional inversion for different mask conventions

2. **`dilateMask(maskDataUrl, radius?)`**
   - Expands mask boundaries to avoid edge artifacts
   - Default radius: 5 pixels

3. **`smoothMaskEdges(maskDataUrl, blurRadius?)`**
   - Applies blur for softer mask transitions
   - Default blur: 3 pixels

4. **`validateMask(maskDataUrl)`**
   - Validates mask data before API submission
   - Checks for empty masks, coverage percentage
   - Returns validation result with statistics

5. **`getMaskStats(maskDataUrl)`**
   - Analyzes mask coverage and bounds
   - Returns coverage percentage and bounding box

## Integration Example

```typescript
import { CanvasEditorIntegration } from './components/CanvasEditorIntegration';

function MyComponent() {
  const handleEditComplete = (editedImageUrl: string) => {
    console.log('Edit completed:', editedImageUrl);
  };

  return (
    <CanvasEditorIntegration
      imageUrl="/path/to/image.jpg"
      style="modern-minimalist"
      onEditComplete={handleEditComplete}
    />
  );
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

**HTTP Status Codes:**
- 400: Bad Request (missing/invalid parameters)
- 401: Unauthorized (missing authentication)
- 429: Too Many Requests (quota exceeded)
- 500: Internal Server Error
- 504: Gateway Timeout (generation timeout)

## Best Practices

1. **Mask Quality**
   - Draw masks slightly larger than the target area
   - Use smooth strokes for better results
   - Avoid very small or very large masks

2. **Prompts**
   - Be specific about what you want to change
   - Include material and style details
   - Avoid contradicting the selected style

3. **Performance**
   - Use "preview" quality for iterative editing
   - Generate final quality only when satisfied
   - Cache results to avoid redundant API calls

4. **Image Requirements**
   - Maximum file size: 10MB
   - Supported formats: JPEG, PNG, WebP
   - Recommended resolution: 1024x768 or higher

## Development Notes

- Set `FAL_API_KEY` environment variable for AI generation
- Mock responses are provided when API key is missing
- All endpoints require authentication via cookies
- CORS is handled automatically by Next.js