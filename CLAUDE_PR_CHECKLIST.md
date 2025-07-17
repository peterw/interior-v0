# Claude PR Creation Checklist

## Pre-PR Submission Checklist

### 1. Type Checking (MANDATORY)
```bash
# Run TypeScript type check BEFORE creating PR
npm run typecheck

# If type errors exist:
# - Fix ALL type errors in modified files
# - Run typecheck again to verify fixes
# - Do NOT proceed with PR until typecheck passes
```

### 2. Build Verification
```bash
# Run full build to catch compilation errors
npm run build

# Ensure:
# - No "Failed to compile" errors
# - No "Type error" messages
# - Build completes successfully
```

### 3. Linting (Optional but Recommended)
```bash
# Run linter if available
npm run lint

# Fix any critical linting errors
# ESLint warnings can be addressed later
```

### 4. Test Execution (If Tests Exist)
```bash
# Run tests if available
npm test

# Ensure no test failures for modified code
```

## PR Creation Process

### 1. Stage and Review Changes
```bash
# Review all changes
git status
git diff

# Stage changes
git add -A

# Verify staged changes
git diff --staged
```

### 2. Create Descriptive Commit
```bash
git commit -m "type: description

- Detail 1
- Detail 2
- Detail 3

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 3. Create Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feat/descriptive-branch-name
```

### 4. Push to Remote
```bash
git push origin feat/descriptive-branch-name
```

### 5. Create PR with GitHub CLI
```bash
# Using GitHub token
GH_TOKEN=<token> gh pr create --title "Title" --body "Body"

# Or if authenticated
gh pr create --title "Title" --body "Body"
```

## Quality Checklist

Before submitting PR, confirm:

- [ ] `npm run typecheck` passes with NO errors
- [ ] `npm run build` completes successfully
- [ ] All TypeScript errors in modified files are fixed
- [ ] Code follows existing patterns in codebase
- [ ] UI copy is concise (under 15 words per sentence)
- [ ] Changes are minimal and focused on the task
- [ ] No unnecessary logging or comments added
- [ ] Changes don't break existing functionality

## Common TypeScript Fixes

### Missing Type Imports
```typescript
import { Doc, Id } from "@/convex/_generated/dataModel";
```

### Array Map Type Annotations
```typescript
// Before
items.map((item) => ...)

// After
items.map((item: Doc<"tableName">) => ...)
```

### Optional Parameter Handling
```typescript
// For optional parameters in queries
if (args.optionalParam) {
  const param = args.optionalParam; // Help TypeScript narrow type
  // Use param instead of args.optionalParam
}
```

### Async Function Types
```typescript
// Properly type async handlers
handler: async (ctx, args): Promise<ReturnType> => {
  // implementation
}
```

## Example PR Workflow

```bash
# 1. Make changes to code
# ... editing files ...

# 2. Run type check FIRST
npm run typecheck

# 3. Fix any type errors
# ... fix errors ...

# 4. Verify type check passes
npm run typecheck

# 5. Run build
npm run build

# 6. Create commit
git add -A
git commit -m "feat: add new feature with proper types"

# 7. Create branch and push
git checkout -b feat/new-feature
git push origin feat/new-feature

# 8. Create PR
GH_TOKEN=xxx gh pr create --title "feat: add new feature" --body "..."
```

## Important Notes

1. **NEVER skip typecheck** - This is mandatory before PR creation
2. **Fix all type errors** in files you've modified
3. **Don't ignore build failures** - They will block PR merge
4. **Keep changes focused** - Don't fix unrelated issues
5. **Test locally first** - Ensure functionality works as expected