# Update Vercel Deployment - Quick Guide

## Your Current Deployment
- **Domain**: `heinthiritun.vercel.app`
- **Status**: Ready (Production)

## Method 1: Automatic Deployment (Recommended)

Vercel automatically deploys when you push to your main branch.

### Steps:
1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Update portfolio - [describe your changes]"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Vercel will automatically:**
   - Detect the push
   - Start a new build
   - Deploy to production
   - Update your domain

4. **Check deployment status:**
   - Go to your Vercel dashboard
   - View the new deployment
   - Wait for "Ready" status

## Method 2: Manual Redeploy via Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project: `heinthirihtun`

2. **Redeploy**
   - Click on "Deployments" tab
   - Find the latest deployment
   - Click the "..." menu
   - Select "Redeploy"
   - Confirm redeployment

## Method 3: Manual Redeploy via CLI

1. **Install Vercel CLI** (if not installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Redeploy to Production**
   ```bash
   vercel --prod
   ```

## Method 4: Force Redeploy from Specific Commit

1. **Go to Vercel Dashboard**
2. **Click on "Deployments"**
3. **Find the deployment you want to redeploy**
4. **Click "..." → "Redeploy"**
5. **Select commit or use latest**

## Verify Your Deployment

After deployment, check:
- ✅ Visit `https://heinthiritun.vercel.app`
- ✅ Test all routes (Home, About, Services, Projects, Contact)
- ✅ Check mobile responsiveness
- ✅ Verify assets load correctly

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify `vercel.json` configuration
- Ensure Node version is >= 18.0.0
- Check for TypeScript errors locally first:
  ```bash
  npm run build:production
  ```

### Changes Not Showing
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check deployment logs for errors
- Verify files were committed and pushed
- Wait a few minutes for CDN propagation

### Domain Issues
- Check custom domain settings in Vercel
- Verify DNS configuration
- Wait for DNS propagation (up to 24 hours)

## Quick Update Checklist

- [ ] Test changes locally: `npm start`
- [ ] Build locally: `npm run build:production`
- [ ] Commit changes: `git add . && git commit -m "Update"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Check Vercel dashboard for deployment
- [ ] Verify live site after deployment completes

## Current Configuration

Your `vercel.json` is configured with:
- ✅ Production build: `npm run build:production`
- ✅ Output: `dist/myfirstproject/browser`
- ✅ SPA routing: All routes → `index.html`
- ✅ Asset caching: Optimized headers

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Dashboard: https://vercel.com/dashboard
- Check deployment logs in Vercel dashboard for detailed error messages

