# Fix Vercel Not Auto-Deploying on Git Push

## Problem
Vercel dashboard is not automatically redeploying when you push code to GitHub.

## Quick Fixes

### Solution 1: Reconnect Git Integration

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Go to Settings → Git:**
   - Click **Settings** tab
   - Click **Git** in the sidebar
   - Or go to: Settings → Git Integration

3. **Disconnect and Reconnect:**
   - Click **"Disconnect"** or **"Remove"** next to your repository
   - Confirm the disconnection
   - Click **"Add Git Repository"** or **"Connect Git Repository"**
   - Select **GitHub**
   - Authorize Vercel if needed
   - Select repository: `HeinThiri/myfirstproject`
   - Click **"Connect"**

4. **Verify Settings:**
   - Production Branch: `main`
   - Framework Preset: (can be empty or "Other")
   - Root Directory: `/` (or leave empty)
   - Build Command: `npm ci && npm run build:production`
   - Output Directory: `dist/myfirstproject/browser`

---

### Solution 2: Check GitHub Webhooks

1. **Go to GitHub Repository:**
   - Visit: https://github.com/HeinThiri/myfirstproject/settings/hooks

2. **Check Webhooks:**
   - Look for webhooks from `vercel.com`
   - Should see: `https://api.vercel.com/v1/integrations/deploy/...`
   - Status should be "Active" with green checkmark

3. **If Missing or Inactive:**
   - The Git reconnection (Solution 1) will recreate it
   - Or manually add webhook:
     - Click **"Add webhook"**
     - Payload URL: (Vercel will provide this)
     - Content type: `application/json`
     - Events: Select "Just the push event"
     - Active: ✅ Checked

---

### Solution 3: Verify Branch Configuration

1. **In Vercel Dashboard:**
   - Settings → Git
   - **Production Branch:** Should be `main`
   - **Preview Branches:** Should include `main` or `*` (all branches)

2. **Check Deployment Settings:**
   - Settings → General → Build & Development Settings
   - **Build Command:** `npm ci && npm run build:production`
   - **Output Directory:** `dist/myfirstproject/browser`
   - **Install Command:** `npm ci`

---

### Solution 4: Manual Trigger (Temporary Fix)

While fixing auto-deploy, manually trigger:

1. **In Vercel Dashboard:**
   - Go to **Deployments** tab
   - Click **"Create Deployment"** button
   - Select branch: `main`
   - Click **"Deploy"**

2. **Or Redeploy Latest:**
   - Find latest deployment from `main`
   - Click **"..."** → **"Redeploy"**

---

### Solution 5: Check Vercel Project Settings

1. **Verify Project is Active:**
   - Settings → General
   - Project should be "Active"
   - No suspension notices

2. **Check Team/Account:**
   - Make sure you're on the correct team/account
   - Settings → General → Team

3. **Verify Repository Access:**
   - Vercel needs access to your GitHub repository
   - Check: https://github.com/settings/installations
   - Find "Vercel" in installed apps
   - Make sure it has access to `HeinThiri/myfirstproject`

---

### Solution 6: Test Webhook Manually

1. **Push a Test Commit:**
   ```bash
   git commit --allow-empty -m "Test Vercel webhook"
   git push origin main
   ```

2. **Check Vercel Dashboard:**
   - Wait 10-30 seconds
   - Go to Deployments tab
   - Should see new deployment starting

3. **If Nothing Happens:**
   - Webhook is likely broken
   - Follow Solution 1 to reconnect

---

## Step-by-Step: Complete Reconnection

### Step 1: Disconnect Git in Vercel
1. Vercel Dashboard → Your Project → Settings → Git
2. Click **"Disconnect"** or **"Remove Repository"**
3. Confirm

### Step 2: Reconnect Git
1. Click **"Add Git Repository"** or **"Connect Git Repository"**
2. Select **GitHub**
3. Authorize Vercel (if prompted)
4. Select: `HeinThiri/myfirstproject`
5. Click **"Import"** or **"Connect"**

### Step 3: Configure Build Settings
1. Production Branch: `main`
2. Framework Preset: (leave empty or "Other")
3. Root Directory: `/`
4. Build Command: `npm ci && npm run build:production`
5. Output Directory: `dist/myfirstproject/browser`
6. Install Command: `npm ci`
7. Click **"Deploy"** or **"Save"**

### Step 4: Test Auto-Deploy
```bash
# Make a test commit
git commit --allow-empty -m "Test auto-deploy after reconnection"
git push origin main
```

Check Vercel dashboard - should see new deployment within 30 seconds!

---

## Verify It's Working

After reconnecting:

1. **Push to GitHub:**
   ```bash
   git commit --allow-empty -m "Test Vercel auto-deploy"
   git push origin main
   ```

2. **Check Vercel:**
   - Go to Deployments tab
   - Within 30 seconds, you should see:
     - New deployment appears
     - Status: "Building..."
     - Source: `main` branch
     - Commit: Your latest commit message

3. **If It Works:**
   - ✅ Auto-deploy is fixed!
   - Future pushes will automatically trigger deployments

---

## Common Issues

### ❌ "Repository not found"
- Vercel doesn't have access to your GitHub repo
- Reconnect Git integration (Solution 1)
- Check GitHub app permissions

### ❌ "Webhook delivery failed"
- GitHub webhook is broken
- Reconnect Git to recreate webhook
- Check GitHub repository settings → Webhooks

### ❌ "Build failed"
- Different issue - check build logs
- Verify build command and output directory
- Check `vercel.json` configuration

### ❌ "No deployments triggered"
- Webhook not receiving events
- Reconnect Git integration
- Verify branch is `main` in Vercel settings

---

## Quick Checklist

- [ ] Git integration is connected in Vercel
- [ ] Production branch is set to `main`
- [ ] GitHub webhook exists and is active
- [ ] Vercel has access to your GitHub repository
- [ ] Build settings are correct
- [ ] Test push triggers deployment

---

## Still Not Working?

1. **Check Vercel Status:**
   - https://vercel-status.com/
   - See if there are any service issues

2. **Contact Vercel Support:**
   - Dashboard → Help → Contact Support
   - Describe the auto-deploy issue

3. **Alternative: Use GitHub Actions:**
   - Set up GitHub Actions to trigger Vercel deployments
   - More control but more complex setup

---

## Expected Behavior After Fix

✅ Push to `main` branch  
✅ Vercel detects push within 10-30 seconds  
✅ New deployment starts automatically  
✅ Deployment appears in Vercel dashboard  
✅ Site updates when deployment completes  

