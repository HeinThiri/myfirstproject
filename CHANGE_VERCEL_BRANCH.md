# Change Vercel Deployment from gh-pages to main Branch

## Step-by-Step Guide

### Step 1: Go to Vercel Project Settings

1. **Open Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Login if needed

2. **Select Your Project:**
   - Click on your project (myfirstproject or myportfolio)

3. **Go to Settings:**
   - Click on **"Settings"** tab (top menu)

### Step 2: Change Production Branch

1. **Find Git Settings:**
   - In Settings, look for **"Git"** section
   - Or scroll to **"Production Branch"** setting

2. **Change Production Branch:**
   - Find **"Production Branch"** dropdown
   - Currently set to: `gh-pages`
   - Change it to: `main`
   - Click **"Save"**

### Step 3: Verify Branch Configuration

1. **Check Git Integration:**
   - In Settings → Git
   - Verify it's connected to: `HeinThiri/myfirstproject`
   - Production Branch should now be: `main`

2. **Check Build Settings:**
   - Go to **"General"** → **"Build & Development Settings"**
   - Build Command: `npm ci && npm run build:production`
   - Output Directory: `dist/myfirstproject/browser`
   - Framework Preset: (can be left empty or set to "Other")

### Step 4: Trigger New Deployment from main

After changing the branch, you need to trigger a deployment:

**Option A: Push to main (Automatic)**
```bash
# Make a small change or empty commit
git commit --allow-empty -m "Trigger Vercel deployment from main"
git push origin main
```

**Option B: Manual Redeploy**
1. Go to **"Deployments"** tab
2. Find a deployment from `main` branch
3. Click **"..."** → **"Promote to Production"**

**Option C: Create New Deployment**
1. Go to **"Deployments"** tab
2. Click **"Create Deployment"** button
3. Select branch: `main`
4. Click **"Deploy"**

---

## Why This Happened

- Vercel might have auto-detected `gh-pages` branch
- Or it was manually set to `gh-pages` previously
- The banner says "push to main branch" but deployment is from `gh-pages`

---

## After Changing to main

✅ **Production deployments** will come from `main` branch  
✅ **Automatic deployments** when you push to `main`  
✅ **Your latest code** will be deployed  

---

## Quick Checklist

- [ ] Go to Vercel Dashboard → Your Project → Settings
- [ ] Find "Production Branch" setting
- [ ] Change from `gh-pages` to `main`
- [ ] Click "Save"
- [ ] Push to main or manually trigger deployment
- [ ] Verify new deployment is from `main` branch
- [ ] Check your site: https://heinthiritun.vercel.app/

---

## If You Don't See the Option

1. **Check Project Permissions:**
   - Make sure you're the project owner/admin
   - Only owners can change production branch

2. **Check Git Connection:**
   - Settings → Git
   - Ensure repository is properly connected
   - You may need to reconnect if there are issues

3. **Alternative: Delete gh-pages Branch**
   - If you don't need `gh-pages` branch:
   ```bash
   git push origin --delete gh-pages
   ```
   - Vercel will automatically use `main` as default

---

## Expected Result

After changing to `main`:
- ✅ Production deployments from `main` branch
- ✅ Automatic deployments on push to `main`
- ✅ Status shows "Deployed from main"
- ✅ Your latest UI changes will be live

