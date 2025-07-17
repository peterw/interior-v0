# interior-v0

AI-powered interior design application that transforms room photos using advanced AI models.

## Quick Start

1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env.local`
4. Run development server: `npm run dev`

## Required Services Setup

### 1. Convex (Database) - 5 minutes
1. Sign up: https://dashboard.convex.dev/signup
2. Create new project
3. Copy your deployment URL and deploy key
4. Dashboard: https://dashboard.convex.dev
5. Docs: https://docs.convex.dev

### 2. FAL AI (Image Generation) - 2 minutes
1. Sign up: https://fal.ai
2. Get API key: https://fal.ai/dashboard/keys
3. Docs: https://fal.ai/docs

### 3. Environment Variables
Create `.env.local`:
```env
# Convex (from https://dashboard.convex.dev)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=prod:your-deploy-key-here

# FAL AI (from https://fal.ai/dashboard/keys)
FAL_API_KEY=your-fal-api-key-here

# Backend (use dummy values if no backend)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_SECRET=any-random-string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Convex Setup Commands
```bash
# Install Convex CLI
npm install -g convex

# Deploy schema (use deploy key from dashboard)
npx convex deploy

# Start Convex dev server
npx convex dev
```

### 5. Add Convex Environment Variables
In Convex Dashboard (https://dashboard.convex.dev):
1. Go to Settings → Environment Variables
2. Add these (optional but recommended):
   - `OPENAI_API_KEY` - Get from https://platform.openai.com/api-keys
   - `SCRAPECREATORS_API_KEY` - For content extraction features

## Running Without Backend

### Fastest Option: Bypass Auth
1. Use the environment variables above with dummy backend values
2. Navigate directly to: http://localhost:3000/interior
3. The app will work with just Convex and FAL AI

### To Fully Bypass Auth (Optional)
Comment out the middleware check in `middleware.ts`:
```typescript
// Comment out this entire block
// if (isProtectedRoute && !token) {
//   return NextResponse.redirect(new URL('/auth/signup', request.url))
// }
```

## Development Commands

```bash
# Terminal 1
npm run dev          # Next.js on http://localhost:3000

# Terminal 2  
npx convex dev       # Convex real-time sync

# Check types before commit
npm run typecheck
npm run lint
npm run build
```

## Quick Links

- **Convex Dashboard**: https://dashboard.convex.dev
- **FAL Dashboard**: https://fal.ai/dashboard
- **FAL Models**: https://fal.ai/models
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **ShadCN UI**: https://ui.shadcn.com

## Troubleshooting

### "Convex not connected"
- Check `NEXT_PUBLIC_CONVEX_URL` is correct
- Run `npx convex dev` in terminal
- Verify at https://dashboard.convex.dev

### "FAL API error"
- Check `FAL_API_KEY` is valid
- Verify credits at https://fal.ai/dashboard
- Check API status: https://status.fal.ai

### "Authentication required"
- Navigate directly to `/interior`
- Or comment out middleware checks
- Or use production API URL if available

## License

Private and confidential.