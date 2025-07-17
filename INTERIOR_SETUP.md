# Interior AI Development Setup Guide

This is a stripped-down version of the codebase containing only the Interior AI functionality for developer testing and integration with FAL AI.

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Git
- A code editor (VS Code recommended)

## Environment Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Backend API (Required)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Authentication (Required)
NEXT_PUBLIC_AUTH_SECRET=your-auth-secret-here

# Convex (Required for data storage)
NEXT_PUBLIC_CONVEX_URL=https://your-convex-instance.convex.cloud
CONVEX_DEPLOY_KEY=your-convex-deploy-key

# FAL AI (Required for interior generation)
FAL_KEY=your-fal-api-key-here

# Cloudflare Images (Optional but recommended)
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token

# OpenAI (Optional - for chat features)
OPENAI_API_KEY=your-openai-api-key
```

### 3. Backend Setup

The frontend expects a Django backend running on `http://localhost:8000`. You'll need:

1. **API Endpoints Required**:
   - `/api/auth/login/` - User authentication
   - `/api/auth/signup/` - User registration
   - `/api/user/` - User profile data
   - `/api/credits/` - Credit management

2. **User Model Requirements**:
   The backend should provide a user object with:
   ```typescript
   {
     id: number
     email: string
     name: string
     credits?: number
     is_premium?: boolean
   }
   ```

### 4. Convex Setup

1. Install Convex CLI:
   ```bash
   npm install -g convex
   ```

2. Initialize Convex:
   ```bash
   npx convex dev
   ```

3. Push the schema:
   ```bash
   npx convex deploy
   ```

## FAL AI Integration

The main FAL integration happens in these files:

### 1. `/app/(protected-views)/interior/api/generate/route.ts`
- Main generation endpoint
- Handles image-to-image transformation
- Uses FAL's interior design models

### 2. `/app/(protected-views)/interior/logic/useInteriorAI.tsx`
- React hook for managing generation state
- Handles file uploads and API calls
- Manages generation history

### 3. Key FAL Models Used:
- `fal-ai/fast-lightning-sdxl` - For quick previews
- `fal-ai/flux/dev` - For high-quality generation
- `fal-ai/recraft-v3` - For style variations

### 4. Integration Points to Implement:

```typescript
// Example FAL integration in generate route
import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY
});

// Generate interior design
const result = await fal.subscribe("fal-ai/flux/dev", {
  input: {
    prompt: stylePrompt,
    image_url: uploadedImageUrl,
    strength: 0.85,
    num_images: 1,
    enable_safety_checker: true
  }
});
```

## Project Structure

```
/workspace/
├── app/
│   ├── (authenticaton)/     # Auth pages (login/signup)
│   ├── (protected-views)/   
│   │   ├── interior/        # Main interior AI pages
│   │   │   ├── api/         # API routes for generation
│   │   │   ├── components/  # UI components
│   │   │   ├── logic/       # Business logic hooks
│   │   │   ├── canvas/      # Canvas editor
│   │   │   ├── canvas-chat/ # Chat-based editor
│   │   │   ├── history/     # Generation history
│   │   │   ├── projects/    # Project management
│   │   │   └── templates/   # Design templates
│   │   └── dashboard/       # Simple dashboard redirect
│   └── interior/
│       └── share/           # Public sharing pages
├── components/              # Shared components
├── convex/                  # Convex backend functions
│   └── interior.ts          # Interior-specific functions
├── lib/                     # Utilities and helpers
└── public/                  # Static assets
```

## Key Features to Test

1. **Image Upload & Generation**
   - Test file upload (drag & drop)
   - Verify image preprocessing
   - Check generation with different styles

2. **Canvas Editor**
   - Masking functionality
   - Inpainting/outpainting
   - Real-time editing

3. **Generation History**
   - Saving generated images
   - Retrieving past generations
   - Sharing functionality

4. **Credit System**
   - Credit deduction on generation
   - Premium vs free tier limits
   - Credit display updates

## Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Start Convex Dev Server** (in another terminal):
   ```bash
   npx convex dev
   ```

3. **Access the App**:
   - Open `http://localhost:3000`
   - Sign up/login
   - Navigate to `/interior`

## Testing Checklist

- [ ] User can sign up and login
- [ ] User can upload an image
- [ ] User can select a style and generate
- [ ] Generation completes successfully
- [ ] Generated images are saved to history
- [ ] Canvas editor loads and allows masking
- [ ] Chat-based editor works
- [ ] Credits are deducted properly
- [ ] Share links work correctly

## Common Issues & Solutions

### 1. CORS Errors
Add CORS headers to your backend API:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### 2. Authentication Issues
Ensure cookies are set with proper domain:
```typescript
// Check middleware.ts for auth logic
const accessToken = request.cookies.get('accessToken')?.value
```

### 3. FAL API Errors
- Verify FAL_KEY is set correctly
- Check FAL dashboard for quota limits
- Ensure image URLs are publicly accessible

### 4. Convex Connection Issues
- Run `npx convex dev` to ensure connection
- Check NEXT_PUBLIC_CONVEX_URL is correct
- Verify schema matches expected structure

## Additional Notes

- The app uses Next.js 15 with App Router
- TypeScript is enforced - run `npm run typecheck`
- Tailwind CSS for styling
- Framer Motion for animations
- ShadCN UI components

## Support

For questions about:
- FAL integration: Check FAL documentation at https://fal.ai/docs
- Convex setup: Visit https://docs.convex.dev
- Next.js issues: See https://nextjs.org/docs

## Deliverables Expected

1. Fully functional interior AI generation
2. Smooth FAL integration with error handling
3. Optimized performance (generation < 30s)
4. Clean, maintainable code
5. Unit tests for critical functions
6. Documentation of any changes made