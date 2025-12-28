# Complete Guide: Push Code to GitHub & Deploy to GitHub Pages

## 📋 Overview
This guide will help you:
1. ✅ Push your Angular portfolio code to GitHub
2. ✅ Deploy it to GitHub Pages (make it live on the web)

---

## Part 1: Push Your Code to GitHub

### Step 1: Check Your Current Status

Open PowerShell/Terminal in your project folder and run:

```powershell
cd "d:\Hein Thiri\portfolio\myportfolio"
git status
```

This shows what files need to be committed.

### Step 2: Add All Files

```powershell
git add .
```

This stages all your files for commit.

### Step 3: Commit Your Changes

```powershell
git commit -m "Initial portfolio setup"
```

Replace the message with something descriptive of your changes.

### Step 4: Push to GitHub

You have two options:

#### Option A: Using SSH (Recommended if already set up)

```powershell
git push origin main
```

#### Option B: Using HTTPS with Personal Access Token

If you get authentication errors, you need a Personal Access Token:

1. **Create Token:**
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name: "Portfolio Deployment"
   - Expiration: Choose your preference
   - Select scope: ✅ **repo** (Full control)
   - Click **"Generate token"**
   - **COPY THE TOKEN** (you won't see it again!)

2. **Switch to HTTPS:**
   ```powershell
   git remote set-url origin https://github.com/HeinThiri/myfirstproject.git
   ```

3. **Push:**
   ```powershell
   git push origin main
   ```
   - Username: `HeinThiri`
   - Password: **Paste your token** (not your GitHub password)

---

## Part 2: Deploy to GitHub Pages

### Step 1: Enable GitHub Pages

1. **Go to your repository:**
   - Open: https://github.com/HeinThiri/myfirstproject

2. **Go to Settings:**
   - Click on **Settings** tab (top menu)

3. **Open Pages settings:**
   - Scroll down to **Pages** in the left sidebar
   - Click on **Pages**

4. **Select Source:**
   - Under **Source**, click the dropdown
   - Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **Save**

### Step 2: Trigger Deployment

The GitHub Actions workflow will automatically run when you push to `main` branch.

**To manually trigger (if needed):**
1. Go to **Actions** tab in your repository
2. Click on **"Build and Deploy"** workflow
3. Click **"Run workflow"** button
4. Select branch: `main`
5. Click **"Run workflow"**

### Step 3: Wait for Deployment

1. **Check the Actions tab:**
   - Go to **Actions** tab in your repository
   - You'll see "Build and Deploy" workflow running
   - Click on it to see progress

2. **Wait for completion:**
   - Build takes 2-5 minutes
   - You'll see green checkmark ✅ when done

### Step 4: View Your Live Website

Once deployment completes:

🌐 **Your website will be live at:**
```
https://heinthiri.github.io/myfirstproject/
```

**To find your URL:**
1. Go to **Settings** → **Pages**
2. You'll see: "Your site is live at https://heinthiri.github.io/myfirstproject/"

---

## ✅ Quick Command Reference

```powershell
# Navigate to project
cd "d:\Hein Thiri\portfolio\myportfolio"

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Check remote URL
git remote -v
```

---

## 🔄 Future Updates

**Every time you make changes:**

1. Make your changes to the code
2. Run these commands:
   ```powershell
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. GitHub Actions will automatically rebuild and redeploy your site!
4. Wait 2-5 minutes, then refresh your website

---

## 🛠️ Troubleshooting

### ❌ "Permission denied" when pushing
- Use Personal Access Token (see Part 1, Step 4, Option B)
- Or set up SSH keys

### ❌ "GitHub Pages is disabled"
- Make sure you selected **"GitHub Actions"** as source (not a branch)
- Check that the workflow file exists: `.github/workflows/build-and-deploy.yml`

### ❌ Build fails in Actions
- Check the **Actions** tab for error messages
- Common issues:
  - Missing dependencies in `package.json`
  - Build errors in your Angular code
  - Node.js version mismatch

### ❌ Website shows 404
- Wait a few minutes after deployment
- Check the Actions tab - deployment might still be running
- Verify the URL: `https://heinthiri.github.io/myfirstproject/`
- Clear browser cache

### ❌ Website looks broken
- Check browser console for errors (F12)
- Verify base-href is set to `/myfirstproject/` in `angular.json` (already configured ✅)
- Make sure all assets (images, CSS) are in the correct paths

---

## 📝 Checklist

Before deploying, make sure:
- [ ] Code is committed locally
- [ ] Code is pushed to GitHub (`git push origin main`)
- [ ] GitHub Pages is enabled (Settings → Pages → GitHub Actions)
- [ ] Workflow file exists: `.github/workflows/build-and-deploy.yml` ✅
- [ ] `angular.json` has `baseHref: "/myfirstproject/"` ✅
- [ ] Actions workflow completed successfully
- [ ] Website is accessible at: https://heinthiri.github.io/myfirstproject/

---

## 🎉 Success!

Once everything is set up:
- ✅ Your code is on GitHub
- ✅ Your website is live on GitHub Pages
- ✅ Every push automatically updates your live site!

**Your Portfolio URL:** https://heinthiri.github.io/myfirstproject/

---

## 📚 Additional Resources

- GitHub Docs: https://docs.github.com/en/pages
- Angular Deployment: https://angular.io/guide/deployment
- GitHub Actions: https://docs.github.com/en/actions




