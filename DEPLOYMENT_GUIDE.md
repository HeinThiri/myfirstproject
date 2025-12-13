# Step-by-Step Guide: Deploy Angular Project to GitHub

## Prerequisites
✅ GitHub repository: https://github.com/HeinThiri/myfirstproject  
✅ Git installed  
✅ Node.js and npm installed  
✅ Project is ready to deploy

---

## Step 1: Resolve Branch Divergence

Your local and remote branches have diverged. We need to sync them first.

### Option A: Keep Local Changes (Recommended if your local code is newer)
```bash
# Pull remote changes and merge
git pull origin main --allow-unrelated-histories

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge remote and local changes"
```

### Option B: Overwrite Remote with Local (Use if you want to replace everything on GitHub)
```bash
# Force push your local changes (WARNING: This overwrites remote)
git push origin main --force
```

### Option C: Start Fresh (If you want to keep remote and add your new files)
```bash
# Fetch remote changes
git fetch origin

# Reset to remote (WARNING: This discards local commits)
git reset --hard origin/main

# Then add your new files
git add .
git commit -m "Add GitHub Actions workflow and updated config"
git push origin main
```

---

## Step 2: Add All Project Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

---

## Step 3: Commit Your Changes

```bash
# Commit with a descriptive message
git commit -m "Add Angular project with GitHub Actions workflow for automated deployment"
```

---

## Step 4: Push to GitHub

```bash
# Push to GitHub
git push origin main
```

If you get authentication errors:
- **For HTTPS**: Use a Personal Access Token instead of password
- **For SSH**: Make sure your SSH key is added to GitHub

---

## Step 5: Enable GitHub Pages

1. Go to: https://github.com/HeinThiri/myfirstproject
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**

---

## Step 6: Verify GitHub Actions Workflow

1. Go to the **Actions** tab in your repository
2. You should see "Build and Deploy" workflow
3. Click on it to see the build progress
4. Wait for it to complete (2-5 minutes)

---

## Step 7: Access Your Deployed Site

Once the workflow completes successfully:
- Your site will be live at: **https://heinthiri.github.io/myfirstproject/**

---

## What Happens Automatically

✅ **On every push**: The workflow builds your Angular app  
✅ **On push to main**: The workflow builds AND deploys to GitHub Pages  
✅ **Future updates**: Just push to main and it auto-deploys!

---

## Troubleshooting

### Build Fails?
- Check the Actions tab for error details
- Make sure all dependencies are in `package.json`
- Verify Node.js version (workflow uses Node 20)

### Deployment Doesn't Work?
- Ensure GitHub Pages is set to "GitHub Actions" (Step 5)
- Check workflow has `contents: write` permission
- Verify build output path: `dist/myfirstproject/browser`

### Authentication Issues?
- For HTTPS: Generate Personal Access Token in GitHub Settings → Developer settings
- For SSH: Add your SSH key to GitHub Settings → SSH and GPG keys

---

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the project
npm run build:production

# Deploy using angular-cli-ghpages
npm run deploy
```

---

## Next Steps

After successful deployment:
- ✅ Your portfolio is live on GitHub Pages
- ✅ Every push to `main` auto-deploys
- ✅ View deployment history in Actions tab
- ✅ Share your portfolio URL!

