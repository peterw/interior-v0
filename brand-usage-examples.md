# Brand Component Usage Guide

## Overview
The new `Brand` component provides consistent styling for "LocalRank" across the application. It supports multiple variants and sizes to fit different contexts.

## Import the Component
```tsx
import { Brand } from '@/components/ui/brand';
```

## Usage Examples

### Default Usage
```tsx
// Simple replacement
<p>Welcome to <Brand /></p>
// Output: Welcome to LocalRank
```

### Bold Variant
```tsx
// For headers or emphasis
<h1><Brand variant="bold" size="xl" /></h1>
```

### Gradient Variant
```tsx
// For hero sections or special emphasis
<h2>Introducing <Brand variant="gradient" size="lg" /></h2>
```

### Highlight Variant
```tsx
// For inline text with brand color
<p>Join <Brand variant="highlight" /> today!</p>
```

## Available Props

### `variant` (optional)
- `default` - Plain text (default)
- `bold` - Bold font weight
- `gradient` - Green gradient effect
- `highlight` - Green colored text with semi-bold weight

### `size` (optional)
- `sm` - Small text (text-sm)
- `md` - Medium text (text-base) - default
- `lg` - Large text (text-lg)
- `xl` - Extra large text (text-xl)

### `className` (optional)
- Additional CSS classes for custom styling

## Examples in Context

### Navigation/Headers
```tsx
<header>
  <Brand variant="bold" size="lg" />
</header>
```

### Marketing Copy
```tsx
<p className="text-gray-600">
  Get started with <Brand variant="highlight" /> and grow your business
</p>
```

### Hero Sections
```tsx
<h1 className="text-4xl">
  <Brand variant="gradient" size="xl" className="inline-block" />
  <span className="ml-2">- Local SEO Made Easy</span>
</h1>
```

### Footer
```tsx
<footer>
  <p className="text-sm text-gray-500">
    © 2025 <Brand size="sm" />. All rights reserved.
  </p>
</footer>
```

## Migration Guide

To update existing "LocalRank" text:

1. Import the Brand component
2. Replace plain text "LocalRank" with `<Brand />`
3. Choose appropriate variant based on context
4. Adjust size if needed

### Before:
```tsx
<p>Welcome to LocalRank</p>
```

### After:
```tsx
<p>Welcome to <Brand /></p>
```

## Best Practices

1. **Consistency**: Use the same variant for similar contexts across the app
2. **Hierarchy**: Use larger sizes and gradient/bold variants for headers
3. **Readability**: Use highlight variant sparingly in body text
4. **Accessibility**: The gradient variant maintains good contrast ratios

## Files Updated in This Implementation

1. `/components/ui/brand.tsx` - New component created
2. `/components/onboarding/WelcomeScreen.tsx` - Updated "Founder of LocalRank"
3. `/components/onboarding/LocalRankAchievementScreen.tsx` - Updated member reference
4. `/app/(protected-views)/upgrade/components/WelcomeContent.tsx` - Updated subscription descriptions

## Next Steps

To apply the Brand component across the entire codebase:

1. Search for all instances of "LocalRank" text
2. Import the Brand component in each file
3. Replace with appropriate variant
4. Test to ensure proper rendering
5. Consider creating a style guide for consistent usage