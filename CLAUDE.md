# Claude Memory


## Important Instructions

- **NEVER push to main branch unless explicitly told to do so**
- Do not push to main if I don't explicitly tell you

## Git Best Practices

- **NEVER include tsconfig.tsbuildinfo in commits or PRs** - This file is auto-generated and should remain in .gitignore
- Always check git status before committing to ensure no build artifacts are included
- The tsconfig.tsbuildinfo file is already in .gitignore and should never be committed

## Creating Pull Requests

### Pre-PR Checklist (MANDATORY)
1. **Check for merge conflicts**: `git merge main` - Fix any conflicts before proceeding
2. **Run typecheck**: `npm run typecheck` - NEVER skip this
3. **Fix ALL type errors** in modified files
4. **Verify build**: `npm run build` must pass
5. **Common fixes**:
   - Missing imports: `import { Doc } from "@/convex/_generated/dataModel"`
   - Array maps: `items.map((item: Doc<"table">) => ...)`
   - Actions use `useAction` not `useMutation`

**IMPORTANT**: Always update your branch with the latest main before creating a PR:
1. Checkout a new branch from main
2. Make your changes and commit them
3. Pull latest main: `git checkout main && git pull origin main`
4. Checkout your branch and rebase: `git checkout your-branch && git rebase main`
5. If conflicts occur, resolve them or start fresh from latest main
6. Push to GitHub and create PR

To create a PR: checkout a new branch, commit your changes, and push to GitHub. After pushing, visit the URL shown in the terminal output to create the PR on GitHub. Alternatively, use `gh pr create` after authenticating with `gh auth login`.

### Alternative PR Creation Method

If there are any issues creating the PR with `gh pr create`, you can simply:
1. Push to a branch using: `git push origin HEAD:branch-name`
2. Visit the URL shown in the terminal output to create the PR manually on GitHub
3. This method always works and doesn't require authentication setup

## Updating Pull Requests

**IMPORTANT**: When updating an existing PR with new commits:
1. Always fetch the latest main first: `git fetch origin main`
2. Rebase your branch on the latest main: `git rebase origin/main`
3. Only include commits from the current conversation/task
4. If there are conflicts or unrelated commits, create a fresh branch from latest main
5. Force push with lease: `git push --force-with-lease origin branch-name`

This ensures PRs only contain relevant changes and are based on the most recent main branch.

## Avoiding Merge Conflicts

### Before Creating Any PR
1. **ALWAYS start from latest main**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b your-new-branch
   ```

2. **For existing branches, always rebase before pushing**:
   ```bash
   git fetch origin main
   git rebase origin/main
   ```

3. **If rebase fails, start fresh**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b new-branch-name
   # Cherry-pick or reapply your changes
   ```

### Common Merge Conflict Scenarios
- **File moved in main**: Always pull latest main before moving/renaming files
- **Same file edited**: Rebase early and often during development
- **Deleted files**: Check if file exists in main before editing
- **Route restructuring**: Be aware of (features) vs regular folder structure

### Best Practices
- Create small, focused PRs that merge quickly
- Don't let branches sit for long periods
- Always check `git log` to ensure your branch only has your commits
- If a PR has been open for >1 day, rebase it before adding new commits

## GitHub Authentication in Docker

### How to Fix GitHub Authentication Issues

**Problem**: `gh auth login` doesn't work well in Docker containers because it requires interactive browser access.

**Solution**: Use a GitHub Personal Access Token directly in commands:

1. **For Git Push** (This always works):
   ```bash
   git push https://<YOUR_GITHUB_TOKEN>@github.com/peterw/{repo_name}.git <branch>
   ```

2. **For GitHub CLI Commands** (prefix with GH_TOKEN):
   ```bash
   # Create PR
   GH_TOKEN=<YOUR_GITHUB_TOKEN> gh pr create --title "Title" --body "Body"
   
   # Update PR
   GH_TOKEN=<YOUR_GITHUB_TOKEN> gh api repos/peterw/{repo_name}/pulls/XXX -X PATCH -f body="New body"
   
   # View PR
   GH_TOKEN=<YOUR_GITHUB_TOKEN> gh pr view XXX
   ```

3. **Set Token in Environment** (for current session):
   ```bash
   export GH_TOKEN=<YOUR_GITHUB_TOKEN>
   # But note: gh auth status may still show not logged in
   ```

**Note**: If you have already exported GH_TOKEN in your environment, the token will be automatically available for git and GitHub CLI commands without needing to prefix each command.

### Why This Works
- The token bypasses the need for browser-based OAuth flow
- Direct HTTPS push with token embedded in URL always works
- GitHub CLI accepts token via GH_TOKEN environment variable for API calls
- No need to run `gh auth login` at all

### For New Docker Containers
Just use the token directly in commands - no setup needed!

### Security Note
**NEVER commit your actual GitHub token to the repository!** Store it securely and use environment variables.

## Frontend Development Workflow (VERY VERY IMPORTANT< NEVER FROGET>)

### Client Components and API Calls
- Never use server-side action functions in useEffect or client components
- Always use the generated client-side service functions from `/lib/api/generated` instead

### Component Development Guidelines
1. **Use ShadCN Components** - Prefer existing components from the root `components/ui` folder
2. **Styling** - Use inline Tailwind CSS styling for customizations, avoid JSX styling
3. **Consistency** - Reuse components and maintain styling consistent with the app design
4. **Separation of Concerns**:
   - Use `logic` folder to create custom React hooks that we will use to manage all logic
   - Use `components` folder inside route folders for route-specific components
   - Use `store` folder inside the route folder to create a file called store.tsx which will keep all global zustand states related to that route and they will be used in our custom hooks and components

### Codebase Structure
- All frontend code is written in Next.js (App router)
- We use TailwindCSS and ShadCN components for all styling

### Route Folder Structure
```
route-folder/
├── components/     # All components for the route
│   ├── Header.tsx
│   └── ...other components
├── logic/         # Data fetching and related logic in shared hooks
│   └── useDataFetching.tsx
├── store/         # Global state management using zustand
│   └── exampleStore.tsx
└── page.tsx       # Actual page file
```

### Best Practices for Code

#### UI and State Management
- **UIs are thin wrappers over data** - Avoid using local state (useState) unless necessary and it's not being used in any other component
- **Choose global state over multiple useStates** - Use zustand stores to manage data from one place, avoiding repeated fetching and maintaining full data control

#### Component Architecture
- **Create component abstractions for complex logic** - When nesting conditional logic or using top-level if/else statements
- **Reserve ternaries for small, readable logic** - Don't use for complex conditional rendering
- **Separate business logic from UI** - Use custom hooks in the `/logic` folder

#### Custom Hooks Best Practices
- **Consolidate related logic in single hooks** - Avoid creating tiny hooks for every functionality as they cause excessive re-renders
- **Keep one major hook per route** - Include all component lifecycle, data filtering, data fetching, and loading logic
- **Hooks handle data fetching and reading** - Components handle data updates through standardized functions

#### API Integration Rules
- **NEVER call APIs directly** - No axios or fetch requests. Always use the backend service functions in the codebase
- **Use typed service methods** - All GmB service functions return typed data
- **Follow backend interfaces exactly** - When calling services, provide data according to the expected interface

#### TypeScript Best Practices
- **Never create custom types** - Always use types provided by backend services
- **No manual type mapping** - Don't create custom interfaces by mapping returned data
- **Avoid type casting** - Don't manually provide UI with types that backend doesn't offer
- **Global states must use backend types** - Type zustand stores based on backend service types
- **Missing parameters** - If backend doesn't provide required parameters, inform the user instead of creating workarounds

#### Code Quality
- **Avoid setTimeout unless necessary** - They're flaky and usually a hack. Always provide a comment explaining why it's needed

#### State Management Best Practices
- **Only store values in state if they cannot be directly derived from other state or props** - If a value (like next player, winner, or status) can always be calculated from existing data (like the board array), do not store it in state—always derive it on render
- **Point out any unnecessary state** - Explain how to replace it with a derived value
- **Use useMemo sparingly** - Only suggest useMemo for performance optimization after measuring a real bottleneck, not as a default approach
- **Prefer derived values over redundant state** - This reduces bugs, keeps components simpler, and ensures data consistency

#### UI/UX Best Practices
- **Prevent Layout Shifts** - When toggling UI elements on/off, avoid completely hiding/showing sections as this causes jarring layout shifts. Instead:
  - Always reserve space for the element (keep it visible)
  - Use opacity, disabled states, and visual styling to indicate when features are unavailable
  - Apply smooth transitions with CSS classes like `transition-opacity duration-200`
  - Use conditional styling rather than conditional rendering for better UX
  - Example: Instead of `{enabled && <Section />}`, use `<Section className={enabled ? 'opacity-100' : 'opacity-50'} disabled={!enabled} />`

### Navigation and Links Best Practices
1. **Use Semantic HTML** - Always use `<Link>` components for navigation, never wrap buttons in links
2. **Avoid Nested Interactive Elements** - Don't put `<Button>` inside `<Link>` or vice versa
3. **Proper Link Styling** - Style links directly with Tailwind classes instead of wrapping buttons:
   ```tsx
   // ❌ Bad - Nested interactive elements
   <Link href="/page">
     <Button>Navigate</Button>
   </Link>
   
   // ✅ Good - Semantic link with button styling
   <Link href="/page" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
     Navigate
   </Link>
   ```
4. **Button vs Link Usage**:
   - Use `<Link>` for navigation to different pages/routes
   - Use `<Button>` for actions (submit, open modal, trigger function)
   - Never use `Button` with `asChild` prop for navigation

## UI Organization and Layout Lessons

### Hamburger Menu Implementation (History Page Improvements)
- **Consolidating Action Buttons**: Successfully replaced row of action buttons (Archive, Duplicate, Share) with hamburger dropdown menu using MoreVertical icon
- **Dropdown Menu Pattern**: Used shadcn/ui DropdownMenu components with `align="end"` positioning for consistent right-alignment
- **Preserving Functionality**: All existing event handlers, loading states, and conditional logic maintained during UI reorganization
- **Icon-Only Buttons**: Export All button converted to icon-only with hover text using `title` attribute and `h-8 w-8 p-0` styling

### Column Alignment and Spacing
- **Consistent Column Widths**: Fixed search term alignment by using consistent width containers (`w-[100px]` for Active toggle area)
- **White Space Handling**: For single scans without active toggles, reserved space with empty container to maintain column alignment
- **Data Mapping Issues**: Pin count display fixed by correcting property access from `item.pin_count` (snake_case) to `item.pinCount` (camelCase) to match API response format

### Date Formatting Simplification
- **Concise Date Display**: Removed time portions from date formatting across all scan types (Created, Last run, Next run)
- **User-Friendly Format**: Standardized to clean format like "June 25, 2025" without cluttering time information

### Button Positioning and Layout
- **Header Organization**: Moved New Scan button to top-right header area by itself, separate from filter controls
- **Logical Grouping**: Export All button remains with filter controls as it's functionally related to filtering/viewing data
- **Responsive Design**: Maintained proper spacing and alignment across different viewport sizes

### Debugging and Data Issues
- **API Response Investigation**: Used console.log with fire emoji (🔥) for debugging pin count display issues
- **Property Name Mismatches**: Discovered and fixed camelCase vs snake_case property access issues between frontend and API
- **Hot Module Replacement**: Leveraged Next.js HMR for immediate visual feedback during development without full rebuilds

### Smart Groups and Search Layout
- **Horizontal Alignment**: Successfully positioned Smart Groups component alongside search business input on same row
- **Filter Organization**: Maintained logical flow of search → smart groups → status toggles → export controls

### Key Technical Patterns
- **DropdownMenuItem with asChild**: Used for Link components within dropdown menus to maintain proper navigation semantics
- **Event Propagation**: Proper use of `e.stopPropagation()` to prevent card click events when interacting with dropdown actions
- **Loading State Preservation**: Maintained all existing loading spinners and disabled states during UI reorganization
- **Conditional Rendering**: Used `scan.scanType === 'repeating'` checks to show/hide Active toggle while preserving column spacing

## Fundamental Development Principles

### Build Error Resolution
- **Always reproduce locally first**: Run `npm run build` to see exact TypeScript/build errors before attempting fixes
- **Fix only specific identified issues**: Don't make assumptions about root causes without seeing actual error messages
- **Property name mismatches**: Common issue between frontend (camelCase) and backend (snake_case) - verify API response format
- **Minimal targeted changes**: Address only the specific build failure, avoid unrelated modifications

### UI Component Organization
- **Consolidate related actions**: Group similar functionality (Archive, Duplicate, Share) into dropdown menus for cleaner interfaces
- **Consistent positioning patterns**: Place primary actions (New Scan) in header areas, secondary actions in contextual menus
- **Icon-only buttons with hover text**: Use `title` attribute for accessibility while maintaining clean visual design
- **Preserve existing functionality**: During UI reorganization, maintain all event handlers, loading states, and conditional logic

### Layout and Spacing Fundamentals
- **Reserved space for alignment**: Use consistent width containers even when content is conditionally hidden
- **Column width consistency**: Apply fixed widths (`w-[100px]`) to maintain alignment across different content types
- **Responsive design considerations**: Test UI changes on both desktop and mobile viewports before completion
- **White space as design element**: Strategic use of empty space maintains visual structure and alignment

### Data Handling Best Practices
- **Property access verification**: Always verify property names match API response format (camelCase vs snake_case)
- **Console debugging with identifiers**: Use distinctive markers (🔥 emoji) for debugging specific data flow issues
- **Hot module replacement leverage**: Use Next.js HMR for immediate visual feedback during development iterations
- **Type safety maintenance**: Ensure frontend property access matches backend TypeScript interface definitions

### Code Quality and Maintenance
- **Follow existing patterns**: Study similar implementations in codebase before creating new components
- **Event handling consistency**: Use proper event propagation control (`stopPropagation()`) for nested interactive elements
- **Loading state preservation**: Maintain existing loading spinners and disabled states during refactoring
- **Accessibility considerations**: Include proper ARIA labels and hover text for icon-only buttons

## Protected Routes and Page Structure

### Adding New Protected Pages
When creating new pages that require authentication:

1. **Page Location**: Place all protected pages in `/app/(protected-views)/` folder
   - Example: `/app/(protected-views)/academy/page.tsx`
   - This folder has a layout that wraps all content with `ProtectedRoute` component

2. **Middleware Configuration**: Add the route to `middleware.ts`
   ```typescript
   const protectedRoutes = [
     '/dashboard',
     '/scan',
     // ... other routes
     '/your-new-route', // Add here
   ]
   ```

3. **Route Configuration**: Add route definition in `/config/routes.ts`
   ```typescript
   export const yourRoutes: Route[] = [
     {
       name: "Your Page",
       path: "/your-route",
       pathname: "/your-route",
       icon: YourIcon
     }
   ]
   ```

4. **Sidebar Integration**: Import and add to `/components/app-sidebar.tsx`
   - Import the route: `import { yourRoutes } from "@/config/routes"`
   - Add a new SidebarMenu section in the appropriate position
   - Follow existing pattern for route mapping and styling

### Sidebar Organization Patterns

The sidebar is organized into logical sections with comments (not visible headers):

1. **Dashboard** - Single item at the top
2. **Track your rankings** - Contains `rankTrackerRoutes` (/scan)
3. **Boost rankings** - Contains `citationRoutes` (/citations)
4. **Find more clients** - Contains `leadsRoutes` (/leads)
5. **GBP Section** - Contains GBP-related routes
6. **Academy** - Educational content
7. **Soon (Collapsible)** - Features coming soon with green badges
8. **Extra (Dropdown)** - Utility routes in footer dropdown menu

#### Adding Routes to Sections
- Each section uses a separate `<SidebarMenu>` component
- Routes are mapped from their respective arrays (e.g., `rankTrackerRoutes.map()`)
- To add to an existing section, add your route to the appropriate array in `routes.ts`
- To create a new section, follow this pattern:
  ```tsx
  {/* Your Section Name */}
  <SidebarMenu className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
    {yourRoutes.map((route) => {
      // Standard route mapping pattern
    })}
  </SidebarMenu>
  ```

#### Section Headers (Optional)
- Use `<SidebarSectionHeader>` component for visible section headers
- Currently, sections use HTML comments for organization
- Headers can be added with: `<SidebarSectionHeader>Section Name</SidebarSectionHeader>`

### Authentication Flow
- **Server-side**: Middleware checks for `accessToken` cookie before serving protected pages
- **Client-side**: ProtectedRoute component provides additional protection
- **Unauthenticated Access**: Users are redirected to signup page with return URL

### Important Notes
- Never place protected pages outside the `(protected-views)` folder
- Always update both middleware.ts AND place in protected folder for double protection
- Test authentication by accessing route in incognito/private browsing



## Backend and Data Consumption

### Core Principles
- **Frontend must use service functions**: Always use fully typed service functions from `/lib/api/generated` to access backend data
- **Never call APIs directly from UI**: The UI should never make direct API calls using fetch, axios, or any other HTTP client
- **Service functions provide type safety**: All backend data is consumed through service functions that return fully typed responses

### Backend Codebase Structure
- **Backend location**: The actual backend code is located in the `/server` folder at the root of the codebase
- **Explore backend code**: You can examine backend models, routes, and logic by exploring files in the `/server` directory
- **Understanding API structure**: Review backend code to understand API endpoints, request/response formats, and business logic

### Type System Guidelines
- **No custom type creation**: Frontend should NEVER create its own types or interfaces
- **Use backend-provided types only**: All types used in UI components must come from the generated service functions
- **Type consistency**: There should be NO discrepancies between actual API data and service function types
- **Type updates**: When backend models change, regenerate types by running `npm run generate:api`

### Code Generation Workflow
1. **Backend model changes**: When backend models or APIs are modified
2. **Regenerate schema**: Run `npm run generate:api` to regenerate the schema from backend
3. **Update service functions**: This command creates new types and service functions in the frontend
4. **Use updated types**: The newly generated types and functions are immediately available for use in UI components

### Docker Environment
- **Backend is dockerized**: The backend runs in a Docker container for consistent development environment
- **Starting backend server**: Use Docker commands to start the backend server if it's not running
- **Database access**: Use the Docker PostgreSQL instance to verify database data matches frontend display
- **Container management**: All backend services run within Docker containers for isolation and reproducibility

### Testing and Verification

#### Backend Testing
- **Direct API testing**: Use curl commands to test backend APIs and verify they return data in the correct format
- **Example curl test**:
  ```bash
  curl -X GET http://localhost:8000/api/endpoint \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <token>"
  ```
- **Database verification**: Connect to the Docker PostgreSQL instance to verify data consistency
- **Response format validation**: Ensure API responses match the expected TypeScript interfaces

#### Frontend Testing with Playwright MCP (Only When user asks you to test the entire UI flow, but you can only call navigate to url tool and read browser logs tool)
- **Browser navigation**: Use browser tools to navigate to routes you've worked on and interact with the UI
- **Visual verification**: Take screenshots using browser tools to verify UI changes are displayed correctly
- **Console monitoring**: Read browser console logs to check if:
  - UI is consuming data properly from service functions
  - No JavaScript errors are occurring
  - API calls are successful and returning expected data
- **Network inspection**: Use browser network tools to verify API requests and responses
- **Interactive testing**: Click buttons, fill forms, and interact with components to ensure functionality works as expected
- **Responsive testing**: Check different viewport sizes to ensure UI works on both desktop and mobile

### Data Flow Best Practices
1. **Service function chain**: UI Component → Service Function → Backend API → Database
2. **Type preservation**: Types flow from Backend → Generated Types → Service Functions → UI Components
3. **No type manipulation**: Never transform or map types manually in the frontend
4. **Error handling**: Service functions handle API errors and return typed error responses

### Common Issues and Solutions
- **Type mismatches**: If types don't match API responses, run `npm run generate:api` to update
- **Missing properties**: If backend doesn't provide required data, modify the backend API rather than creating workarounds
- **API changes**: Always regenerate types after backend API modifications to maintain consistency
- **Development workflow**: Make backend changes first, then regenerate frontend types and update UI accordingly


### After every major BE+FE change, you should regenerate the types to update service functions and match types to backend data coming from direct APIs. 

If you wanna test UI you can do so using the playwright browser mcp tools to navigate read console logs and take screenhots to understand and check console logs to see UI output.

## Django Database Migrations - CRITICAL RULES

### NEVER Create Manual Migration Files
- **NEVER manually create migration files** - Always use Django's `makemigrations` command
- **NEVER use raw SQL DROP TABLE commands** - This will destroy all production data permanently
- **NEVER edit auto-generated migration files** - Only modify `models.py` and let Django handle migrations

### Why Manual Migrations Are Dangerous
Manual migrations with `DROP TABLE` commands are like:
- Setting your filing cabinet on fire instead of organizing it
- Demolishing your house because the kitchen is messy
- Deleting all customer data because of a minor schema issue

In production, these commands will:
- **Permanently delete ALL data** in the affected tables
- Cause irreversible data loss for customers
- Lead to potential lawsuits and business failure
- Cannot be recovered without recent backups

### The Correct Migration Workflow

#### For Backend Changes in Docker:
1. **Make model changes** in `models.py` only
2. **Generate migrations**: `docker exec server-{repo_name}-web-1 python manage.py makemigrations`
3. **Review the generated migration** to ensure it's safe
4. **Apply migrations**: `docker exec server-{repo_name}-web-1 python manage.py migrate`

#### When Facing Migration Issues:
1. **Read the error carefully** - Django provides detailed error messages
2. **Fix incrementally**:
   - Add default values for new non-nullable fields
   - Make fields nullable temporarily during migration
   - Create data migrations for complex transformations
3. **Test on a copy of production data** before applying to production
4. **Never take shortcuts** - There's always a proper solution

#### Common Migration Problems and Solutions:
- **"Column already exists"**: Use `--fake` to mark migration as applied
- **"Cannot add non-nullable field"**: Add a default value or make it nullable first
- **"Foreign key constraint"**: Ensure referenced data exists or use `on_delete=SET_NULL`
- **Conflicting migrations**: Resolve by merging or resetting to a common point

### The --fake Flag
The `--fake` flag tells Django to mark a migration as applied without actually running it:
- Use when the database already has the changes
- Like checking off a task that's already done
- Prevents Django from trying to apply changes that already exist
- Example: `docker exec server-{repo_name}-web-1 python manage.py migrate app_name migration_number --fake`

### Migration Best Practices
1. **Always work on feature branches** - Never experiment on main/production
2. **Test migrations locally first** - Use a copy of production data
3. **Keep migrations small and focused** - One logical change per migration
4. **Document complex migrations** - Add comments explaining why
5. **Coordinate with team** - Migrations can conflict between developers
6. **Back up before major migrations** - Especially for production deployments

### Red Flags in Migration Files
If you see any of these in a migration file, STOP immediately:
- `migrations.RunSQL("DROP TABLE...")`
- `migrations.RunSQL("TRUNCATE...")`
- `migrations.RunSQL("DELETE FROM...")`
- Any manual SQL that destroys data
- Comments like "Generated manually" or "Quick fix"

These are signs someone took a dangerous shortcut that could destroy production data.

## Image Handling Guidelines

### Overview
All images in our codebase are automatically optimized and served via Cloudflare's global CDN. This ensures fast loading times, automatic format conversion (WebP/AVIF), and reduced bandwidth costs.

### Adding New Images

#### 1. **Where to Place Images**
```
public/
└── images/
    ├── logo/           # Brand assets
    ├── icons/          # UI icons
    ├── features/       # Feature-specific images
    ├── marketing/      # Marketing materials
    └── [category]/     # Other logical groupings
```

#### 2. **How to Use Images in Code**
```tsx
// ✅ ALWAYS use the cf() wrapper for local images
import Image from 'next/image';
import { cf } from '@/lib/cf';

<Image 
  src={cf('/images/logo.png')} 
  width={200} 
  height={100} 
  alt="Logo" 
/>

// ❌ NEVER use direct paths
<Image src="/images/logo.png" />  // Wrong!
```

#### 3. **External Images**
```tsx
// External images don't need cf() wrapper
<Image 
  src="https://example.com/image.jpg" 
  width={400} 
  height={300} 
  alt="External" 
/>
```

### Image Optimization Process

1. **Add Image**: Place your image in `public/images/`
2. **Use in Code**: Wrap path with `cf()` function
3. **Push to GitHub**: Commit and push your changes
4. **Automatic Upload**: GitHub Action detects new images and uploads to Cloudflare
5. **Mapping Update**: `cf-images.json` is automatically updated with CDN URLs
6. **Global Delivery**: Images are served from Cloudflare's 300+ edge locations

### Best Practices

#### File Naming
- Use lowercase with hyphens: `hero-banner.jpg` not `HeroBanner.jpg`
- Be descriptive: `dashboard-empty-state.png` not `img1.png`
- Include dimensions for variants: `logo-200x50.png`

#### File Formats
- **Photos**: Use JPEG for photographs
- **Graphics**: Use PNG for graphics with transparency
- **Logos**: Use SVG when possible for scalability
- **Animations**: Use GIF sparingly (consider video alternatives)

#### Image Sizes
- Keep original images under 2MB
- Provide appropriate dimensions in Image component
- Cloudflare automatically optimizes delivery size

#### Alt Text
- **Always** provide meaningful alt text
- Describe what the image conveys, not just what it shows
- Keep it concise (under 125 characters)

### Common Patterns

#### Hero Images
```tsx
<div className="relative w-full h-[400px]">
  <Image 
    src={cf('/images/hero/landing-page.jpg')}
    fill
    style={{ objectFit: 'cover' }}
    alt="Landing page hero showing product dashboard"
    priority  // Use for above-the-fold images
  />
</div>
```

#### Icons
```tsx
<Image 
  src={cf('/images/icons/feature-icon.svg')}
  width={24}
  height={24}
  alt="Feature icon"
  className="inline-block"
/>
```

#### Responsive Images
```tsx
<Image 
  src={cf('/images/product-screenshot.png')}
  width={1200}
  height={600}
  alt="Product screenshot"
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### How Cloudflare Integration Works

1. **Deterministic IDs**: Each image path generates the same ID, so updates replace existing images
2. **Automatic Format**: Cloudflare serves WebP/AVIF to supported browsers automatically
3. **Global CDN**: Images load from the nearest edge location to the user
4. **Fallback**: If Cloudflare is unavailable, images load from local files

### Troubleshooting

#### Image Not Loading?
1. Check if you wrapped the path with `cf()`
2. Verify the image exists in `public/images/`
3. Check `cf-images.json` to see if it's been uploaded
4. Wait for GitHub Action to complete after pushing

#### Image Updated but Shows Old Version?
- Cloudflare uses the same ID for the same path
- Clear browser cache or hard refresh (Cmd/Ctrl + Shift + R)
- The new version will propagate globally within minutes

#### Need to Force Re-upload?
1. Delete the entry from `cf-images.json`
2. Push the change
3. GitHub Action will re-upload the image

### Performance Tips

1. **Use `priority` prop** for above-the-fold images
2. **Set dimensions** to prevent layout shift
3. **Use `fill` prop** for responsive containers
4. **Lazy load** is automatic (disable with `loading="eager"` if needed)

### Do's and Don'ts

✅ **DO**
- Always use `cf()` wrapper for local images
- Organize images in logical folders
- Optimize images before uploading (basic compression)
- Use meaningful file names and alt text
- Test on slow connections

❌ **DON'T**
- Don't commit massive unoptimized images
- Don't use images for text (use actual text)
- Don't forget alt attributes
- Don't use `img` tags (use Next.js Image)
- Don't hardcode Cloudflare URLs

### Migration Guide for Existing Code

When updating existing components:
```tsx
// Find
<Image src="/images/old-image.png" />

// Replace with
<Image src={cf("/images/old-image.png")} />

// Don't forget to import cf
import { cf } from '@/lib/cf';
```

## TypeScript and ESLint Configuration

### Handling Convex Circular Reference Errors
When you encounter TypeScript errors like "'functionName' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer", use one of these approaches:

1. **Add @ts-ignore comments** for specific lines:
   ```typescript
   // @ts-ignore - Circular reference with internal action
   export const fetchUserTweets = action({
   ```

2. **Configure ESLint overrides** for Convex files in `.eslintrc.json`:
   ```json
   {
     "files": ["convex/**/*.ts", "convex/**/*.tsx"],
     "rules": {
       "@typescript-eslint/no-explicit-any": "off",
       "@typescript-eslint/explicit-module-boundary-types": "off"
     }
   }
   ```

These errors typically occur when public actions reference internal actions in Convex, which is a valid pattern but causes TypeScript's strict type checking to fail.

## Convex Integration Best Practices

### Query Types and When to Use Them
Convex has different query types that must be used correctly based on the calling context:

1. **`query`** - Public queries callable from client-side React components
   - Use for: Frontend components, React hooks, client-side data fetching
   - Example: `getBrandTone` called from a React component

2. **`internalQuery`** - Internal queries only callable from server-side Convex functions
   - Use for: Actions, mutations, other internal functions
   - Example: `getBrandToneInternal` called from processor action
   - Common mistake: Using `query` instead of `internalQuery` causes TypeScript errors during deployment

3. **`mutation`** - Functions that modify data
   - Can be public (callable from client) or internal
   - Example: `saveBrandTone` called from React to save user preferences

4. **`action`** - Functions that can call external APIs or have side effects
   - Use for: AI generation, external API calls, complex processing
   - Example: `processJobs` action that calls OpenAI API

### Action Best Practices

#### When to Use Internal vs Public Actions

**Problem**: When an action needs to be called from another action, Convex requires it to be an `internalAction`. Using a regular `action` will cause TypeScript errors during deployment.

**Solution Pattern**:
```typescript
// 1. Create the internal action for server-to-server calls
export const fetchDataInternal = internalAction({
  args: { /* args */ },
  handler: async (ctx, args) => {
    // Implementation
  },
});

// 2. Create a public wrapper if client access is needed
export const fetchData = action({
  args: { /* same args */ },
  handler: async (ctx, args) => {
    return ctx.runAction(internal.module.fetchDataInternal, args);
  },
});
```

**When to Apply This Pattern**:
- Action calls another action: The called action must be `internalAction`
- Action used in both contexts: Create both internal and public versions
- Security sensitive actions: Keep as `internalAction` only
- Client-only actions: Regular `action` is fine

**Example from our codebase**:
```typescript
// youtube.ts - Needs to be called from youtubeSource.ts action
export const fetchYouTubeTranscriptInternal = internalAction({ /* ... */ });
export const fetchYouTubeTranscript = action({ /* public wrapper */ });

// youtubeSource.ts - Calls the internal version
const result = await ctx.runAction(internal.youtube.fetchYouTubeTranscriptInternal, args);
```

### Common Convex Pitfalls and Solutions

#### TypeScript Errors Only During Deployment
- **Issue**: Code works in development but fails during `convex deploy`
- **Cause**: Convex has stricter type checking during deployment
- **Solution**: Always run `npx convex dev` during development to catch errors early

#### Query vs InternalQuery Confusion
- **Naming Convention**: Functions with `Internal` suffix should use `internalQuery/internalMutation`
- **Context Check**: Before creating a function, determine where it will be called from
- **Error Example**: `Property 'brandTone' does not exist on type...` means wrong query type

#### Best Practices
1. **Clear Naming**: Use `Internal` suffix for internal-only functions
2. **Import Correctly**: Import the right function types from `./_generated/server`
3. **Test Early**: Run Convex dev server to catch type errors during development
4. **Separate Concerns**: Create both public and internal versions when needed

## TypeScript Best Practices to Avoid Build Errors

### Always Type Array Methods
**Problem**: Array methods like `map`, `filter`, `reduce` often cause "implicitly has an 'any' type" errors.

**Solution**: Always add type annotations to callback parameters:
```typescript
// ❌ Bad - will cause TypeScript error
projects?.map((project) => {
  // Error: Parameter 'project' implicitly has an 'any' type
});

// ✅ Good - explicit type annotation
projects?.map((project: Doc<"projects">) => {
  // No error
});

// ✅ Also good - if you have a type alias
type Project = Doc<"projects">;
projects?.map((project: Project) => {
  // No error
});
```

### Common Array Method Patterns
```typescript
// Filter
sources.filter((source: Doc<"sources">) => source.type === "url");

// Find
brandTones?.find((bt: Doc<"brandTones">) => bt.projectId === id);

// Map with index
items.map((item: ItemType, index: number) => ...);

// Reduce
array.reduce((acc: AccType, curr: CurrType) => ..., initialValue);
```

### Import Doc Type from Convex
**Always import the Doc type** when working with Convex documents:
```typescript
import { Doc } from "@/convex/_generated/dataModel";

// Then use it for type safety
type Source = Doc<"sources">;
type Project = Doc<"projects">;
type BrandTone = Doc<"brandTones">;
```

### Avoid Implicit Any in Component Props
```typescript
// ❌ Bad
interface TemplateEditorProps {
  template?: any;  // Avoid any type
}

// ✅ Good
interface TemplateEditorProps {
  template?: Doc<"templates">;  // Use specific Convex type
}
```

### Type Safety Checklist Before Building
1. **Run TypeScript check**: `npm run typecheck` before `npm run build`
2. **Check array methods**: Ensure all `map`, `filter`, `find` have typed parameters
3. **Import Doc types**: Use `Doc<"tableName">` for Convex documents
4. **Avoid `any`**: Replace all `any` types with specific types
5. **Component props**: Type all component props properly

### Quick Fix for Common Errors
```typescript
// If you see: "Parameter 'x' implicitly has an 'any' type"
// Add the type annotation:

// For Convex documents
(item: Doc<"tableName">) => ...

// For primitives
(value: string) => ...
(index: number) => ...
(isActive: boolean) => ...

// For objects
(data: { name: string; id: string }) => ...
```




