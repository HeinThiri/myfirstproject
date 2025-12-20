# Step-by-Step Guide: Deploy Angular Project to Vercel

This guide will walk you through deploying your Angular project from GitHub to Vercel.

## Prerequisites Checklist

- ✅ Your project is already on GitHub: `https://github.com/HeinThiri/myfirstproject`
- ✅ You have a Vercel account (or will create one)
- ✅ Your project is configured with `vercel.json` and `api/server.mjs`
- ✅ `baseHref` is set to `/` in `angular.json` (configured for Vercel root domain)

---

## Step 1: Ensure Your Code is Pushed to GitHub

1. **Open your terminal/command prompt** in your project directory:
   ```bash
   cd "D:\Hein Thiri\portfolio\myportfolio"
   ```

2. **Check if you have uncommitted changes**:
   ```bash
   git status
   ```

3. **If you have changes, commit and push them**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

   > **Note**: Make sure your code is pushed to the `main` branch (or `master` if that's your default branch).

---

## Step 2: Sign Up / Log In to Vercel

1. **Go to Vercel**: Open your browser and visit [https://vercel.com](https://vercel.com)

2. **Sign In or Sign Up**:
   - Click **"Sign Up"** if you don't have an account
   - Click **"Log In"** if you already have an account
   - **Recommended**: Sign in with GitHub (this makes deployment easier)

3. **Authorize Vercel** (if signing in with GitHub):
   - GitHub will ask for permissions
   - Click **"Authorize Vercel"** to allow Vercel to access your repositories

---

## Step 3: Import Your Project to Vercel

1. **After logging in**, you'll see the Vercel dashboard

2. **Click "Add New..."** button (usually in the top right corner)

3. **Select "Project"** from the dropdown menu

4. **Import from GitHub**:
   - You'll see a list of your GitHub repositories
   - **Search for**: `myfirstproject` or `HeinThiri/myfirstproject`
   - **Click "Import"** next to your repository

---

## Step 4: Configure Project Settings

After importing, Vercel will show you the project configuration page. Configure as follows:

### Framework Preset
- **Select**: `Other` or leave as default
- (Don't select Angular preset - we have custom SSR configuration)

### Root Directory
- **Leave as**: `./` (default - root of repository)

### Build Command
- **Enter**: `npm run build`
- (This should auto-detect, but verify it's correct)

### Output Directory
- **Enter**: `dist/myfirstproject/browser`
- (This is where Angular builds your static files)

### Install Command
- **Leave as**: `npm install` (default)

### Environment Variables
- **Skip for now** (unless your app needs specific environment variables)
- You can add them later in project settings

### Node.js Version
- **Select**: `20.x` (matches your `vercel.json` configuration)

---

## Step 5: Deploy

1. **Review your settings** - make sure everything looks correct

2. **Click "Deploy"** button (usually at the bottom of the page)

3. **Wait for deployment**:
   - You'll see a build log in real-time
   - This usually takes 2-5 minutes
   - The build process will:
     - Install dependencies (`npm install`)
     - Build your Angular app (`npm run build`)
     - Deploy to Vercel's servers

---

## Step 6: Verify Deployment

1. **After deployment completes**, you'll see:
   - ✅ "Ready" status
   - A URL like: `https://myfirstproject-xxxxx.vercel.app`

2. **Click the URL** to open your deployed site

3. **Test your site**:
   - Check if pages load correctly
   - Test navigation between routes
   - Verify images and assets load properly
   - Test SSR functionality (view page source to see rendered HTML)

---

## Step 7: Set Up Custom Domain (Optional)

If you want to use a custom domain:

1. **Go to your project dashboard** on Vercel

2. **Click "Settings"** tab

3. **Click "Domains"** in the left sidebar

4. **Add your domain**:
   - Enter your domain name (e.g., `yourdomain.com`)
   - Click "Add"

5. **Configure DNS**:
   - Vercel will show you DNS records to add
   - Go to your domain registrar (where you bought the domain)
   - Add the DNS records Vercel provides
   - Wait for DNS propagation (can take up to 48 hours, usually faster)

---

## Step 8: Automatic Deployments (Already Set Up!)

✅ **Good news!** Vercel automatically deploys when you push to GitHub:

- **Production**: Every push to `main` branch = automatic production deployment
- **Preview**: Every push to other branches = preview deployment
- **Pull Requests**: Every PR gets its own preview URL

**To update your site**:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update my site"
   git push origin main
   ```
3. Vercel will automatically rebuild and deploy!

---

## Troubleshooting

### Build Fails

**Problem**: Build fails with errors

**Solutions**:
1. Check the build logs in Vercel dashboard (click on the failed deployment)
2. Look for error messages
3. Common issues:
   - Missing dependencies → Check `package.json`
   - Build command wrong → Verify `npm run build` works locally
   - Node version mismatch → Check Node version in Vercel settings

**Test locally first**:
```bash
npm run build
```
If this fails locally, fix it before deploying.

---

### Site Shows 404 or Blank Page

**Problem**: Site loads but shows 404 or blank page

**Solutions**:
1. Check `vercel.json` configuration
2. Verify `outputDirectory` is correct: `dist/myfirstproject/browser`
3. Check if `api/server.mjs` exists
4. Look at Vercel function logs (in dashboard → Functions tab)

---

### Assets Not Loading (Images, CSS, etc.)

**Problem**: Images or stylesheets don't load

**Solutions**:
1. Check that assets are in `src/assets` folder
2. Verify `angular.json` includes assets in build configuration
3. Check browser console for 404 errors
4. Ensure paths are relative (not absolute)

---

### SSR Not Working

**Problem**: Server-side rendering doesn't work

**Solutions**:
1. Verify `api/server.mjs` exists and is correct
2. Check `vercel.json` rewrites configuration
3. Look at serverless function logs in Vercel dashboard
4. Test SSR locally:
   ```bash
   npm run build
   npm run serve:ssr:myfirstproject
   ```

---

## Quick Reference Commands

```bash
# Build locally to test
npm run build

# Test SSR locally
npm run serve:ssr:myfirstproject

# Deploy via CLI (alternative method)
npm install -g vercel
vercel login
vercel --prod
```

---

## Your Deployment URLs

After successful deployment, you'll have:

- **Production URL**: `https://myfirstproject-xxxxx.vercel.app`
- **Custom Domain** (if configured): `https://yourdomain.com`
- **Preview URLs**: One for each branch/PR

---

## Next Steps

1. ✅ **Share your site**: Share the Vercel URL with others
2. ✅ **Monitor deployments**: Check Vercel dashboard for deployment status
3. ✅ **Set up custom domain**: Add your own domain name
4. ✅ **Configure environment variables**: If your app needs them
5. ✅ **Set up analytics**: Add Vercel Analytics (optional)

---

## Need Help?

- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: Check Vercel dashboard → Help & Support
- **Check Build Logs**: Always check deployment logs first for errors

---

**Congratulations! 🎉 Your Angular portfolio is now live on Vercel!**

Your site URL: `https://myfirstproject-xxxxx.vercel.app` (check your Vercel dashboard for the exact URL)

