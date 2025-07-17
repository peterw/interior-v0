# Interior AI

AI-powered interior design application that transforms room photos using advanced AI models.

## Quick Start

1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env.local`
4. Run development server: `npm run dev`

## Running Without Backend

To run the frontend without the Django backend at localhost:8000:

### Option 1: Use Production API
```env
# In .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Option 2: Mock Authentication
1. Comment out authentication checks in `middleware.ts`
2. Create a mock user in `contexts/auth-context.tsx`:
```tsx
// Replace API call with mock data
const mockUser = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
  credits: 100
};
```

### Option 3: Minimal Setup
1. Set these environment variables:
```env
# Required for core functionality
NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key
FAL_API_KEY=your-fal-api-key

# Use dummy values for backend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_SECRET=dummy-secret
```

2. The app will show authentication errors but Interior AI features at `/interior` will work with Convex and FAL AI.

## Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key
FAL_API_KEY=your-fal-api-key

# Optional
CF_ACCOUNT_ID=your-account-id
CF_API_TOKEN=your-api-token
```

## Development

```bash
npm run dev          # Start development
npm run build        # Build production
npm run typecheck    # Check types
npm run lint         # Run linter
```

## Key Features

- Room transformation with multiple design styles
- Canvas editor for masking and editing
- Chat-based editing interface
- Generation history tracking
- Share functionality

## License

Private and confidential.