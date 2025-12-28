# How to Make Your Website Live on GitHub Pages

## Quick Steps to Deploy Your Angular Portfolio

---

## Step 1: Push Your Code to GitHub

First, make sure your code is on GitHub:

```bash
# Check if you have uncommitted changes
git status

# Add all files
git add .

# Commit changes
git commit -m "Ready for GitHub Pages deployment"

# Push to GitHub (you'll need to authenticate)
git push origin main
```

**If you get authentication error:**
- Use Personal Access Token (see authentication section below)

---

## Step 2: Enable GitHub Pages

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

---

## Step 3: Trigger the Deployment

The GitHub Actions workflow will automatically run when you:
- Push to the `main` branch
- Or manually trigger it

**To manually trigger:**
1. Go to **Actions** tab
2. Click on **"Build and Deploy"** workflow
3. Click **"Run workflow"** button
4. Select branch: `main`
5. Click **"Run workflow"**

---

## Step 4: Wait for Deployment

1. **Check the Actions tab:**
   - Go to **Actions** tab in your repository
   - You'll see "Build and Deploy" workflow running
   - Click on it to see progress

2. **Wait for completion:**
   - Build takes 2-5 minutes
   - You'll see green checkmark ✅ when done

---

## Step 5: View Your Live Website

Once deployment completes:

🌐 **Your website will be live at:**
```
https://heinthiri.github.io/myfirstproject/
```

**To find your URL:**
1. Go to **Settings** → **Pages**
2. You'll see: "Your site is live at https://heinthiri.github.io/myfirstproject/"

---

## What Happens Automatically

✅ **Every time you push to `main` branch:**
- GitHub Actions builds your Angular app
- Deploys it to GitHub Pages
- Your website updates automatically!

---

## Authentication Setup (If Needed)

### Create Personal Access Token:

1. **Go to GitHub Settings:**
   - https://github.com/settings/tokens

2. **Generate Token:**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name: "Portfolio Deployment"
   - Expiration: Choose (90 days, 1 year, or no expiration)
   - Select scope: ✅ **repo** (Full control)
   - Click **"Generate token"**
   - **COPY THE TOKEN** (you won't see it again!)

3. **Use Token:**
   ```bash
   git push origin main
   ```
   - Username: `HeinThiri`
   - Password: **Paste your token** (not your GitHub password)

---

## Troubleshooting

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

### ❌ Can't push code
- Set up Personal Access Token (see above)
- Or use SSH keys

### ❌ Website looks broken
- Check browser console for errors (F12)
- Verify base-href is set to `/myfirstproject/` in `angular.json`
- Make sure all assets (images, CSS) are in the correct paths

---

## Verify Everything is Set Up

✅ **Checklist:**
- [ ] Code is pushed to GitHub
- [ ] GitHub Pages is enabled (Settings → Pages → GitHub Actions)
- [ ] Workflow file exists: `.github/workflows/build-and-deploy.yml`
- [ ] `angular.json` has `baseHref: "/myfirstproject/"`
- [ ] Actions workflow completed successfully
- [ ] Website is accessible at: https://heinthiri.github.io/myfirstproject/

---

## Quick Commands Reference

```bash
# Check status
git status

# Add and commit
git add .
git commit -m "Update portfolio"

# Push to GitHub
git push origin main

# Check remote
git remote -v
```

---

## Your Website URL

Once deployed, share your portfolio at:
**https://heinthiri.github.io/myfirstproject/**

🎉 **Congratulations! Your portfolio is now live!**




