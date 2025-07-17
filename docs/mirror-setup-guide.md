# Mirror Workflow Setup Guide

## Overview
This guide helps you set up the GitHub Actions workflow to automatically mirror the localrank repository to the localrank-new/backend folder.

## Prerequisites
1. Write access to both repositories
2. GitHub Personal Access Token with appropriate permissions

## Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Mirror to localrank-new"
4. Select these scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Add Token to Repository Secrets

1. Go to your localrank repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `MIRROR_TOKEN`
5. Value: Paste your Personal Access Token
6. Click "Add secret"

### 3. Verify Workflow File

The workflow file has been created at `.github/workflows/mirror-to-localrank-new.yml`

Key features:
- Triggers on every push to main branch
- Can be manually triggered via workflow_dispatch
- Excludes large files and build artifacts
- Preserves commit history references
- Creates a MIRROR_INFO.md file with sync details

### 4. Test the Workflow

Option A - Manual trigger:
1. Go to Actions tab in your repository
2. Select "Mirror to localrank-new" workflow
3. Click "Run workflow"
4. Select main branch
5. Click "Run workflow" button

Option B - Push to main:
```bash
git add .github/workflows/mirror-to-localrank-new.yml
git commit -m "Add mirror workflow to localrank-new"
git push origin main
```

### 5. Monitor the Workflow

1. Go to the Actions tab
2. Click on the running workflow
3. View logs to ensure successful completion

## What Gets Mirrored

### Included:
- All source code files
- Configuration files
- Documentation
- Assets under 5MB

### Excluded:
- `.git` directory
- `node_modules`
- Build outputs (`.next`, `dist`, `build`)
- Lock files (`package-lock.json`, `yarn.lock`, etc.)
- Environment files (`.env*`)
- Large media files (images, videos)
- Archives (`.zip`, `.tar`, `.gz`)
- Files listed in `.gitignore`
- Files larger than 5MB

## Troubleshooting

### Permission Denied
- Ensure MIRROR_TOKEN has `repo` and `workflow` scopes
- Verify token hasn't expired
- Check you have write access to localrank-new

### No Changes Detected
- The workflow only commits if there are actual changes
- Check the logs to see what files were processed

### Large Files Error
- The workflow excludes files >5MB automatically
- If needed, adjust the `--size-limit` in the rsync command

## Customization

To modify what gets mirrored, edit the `rsync` command in the workflow:
- Add exclusions: `--exclude='pattern'`
- Change size limit: `--size-limit=10M`
- Include specific directories only: Add source paths

## Security Notes

- Never commit the MIRROR_TOKEN to the repository
- Use repository secrets for all sensitive data
- Regularly rotate your Personal Access Tokens
- Consider using fine-grained tokens if available