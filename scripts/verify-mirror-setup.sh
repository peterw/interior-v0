#!/bin/bash

echo "=== Mirror Workflow Setup Verification ==="
echo

# Check if workflow file exists
if [ -f ".github/workflows/mirror-to-localrank-new.yml" ]; then
    echo "✅ Workflow file exists"
else
    echo "❌ Workflow file not found at .github/workflows/mirror-to-localrank-new.yml"
    exit 1
fi

# Check workflow syntax
echo "Checking workflow syntax..."
if command -v yamllint &> /dev/null; then
    yamllint .github/workflows/mirror-to-localrank-new.yml
    echo "✅ YAML syntax check passed"
else
    echo "⚠️  yamllint not installed, skipping syntax check"
fi

# Show workflow summary
echo
echo "=== Workflow Configuration ==="
echo "Trigger: Push to main branch + manual dispatch"
echo "Target: localrank-new repository, backend folder"
echo "Exclusions: Large files, build artifacts, node_modules"
echo

# Check git status
echo "=== Git Status ==="
git status --short

echo
echo "=== Next Steps ==="
echo "1. Create a GitHub Personal Access Token with 'repo' and 'workflow' scopes"
echo "2. Add it as MIRROR_TOKEN secret in repository settings"
echo "3. Commit and push the workflow file:"
echo "   git add .github/workflows/mirror-to-localrank-new.yml"
echo "   git commit -m 'Add mirror workflow to localrank-new'"
echo "   git push origin main"
echo
echo "For detailed instructions, see: docs/mirror-setup-guide.md"