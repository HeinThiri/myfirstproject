# Deploy to Vercel - Quick Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Angular settings

3. **Configure Build Settings** (if needed)
   - Framework Preset: Other
   - Build Command: `npm run build:production`
   - Output Directory: `dist/myfirstproject/browser`
   - Install Command: `npm install`
   - Root Directory: `./`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **For Production Deployment**
   ```bash
   vercel --prod
   ```

## Configuration

The `vercel.json` file is already configured with:
- ✅ Production build command
- ✅ Correct output directory
- ✅ SPA routing support (all routes redirect to index.html)
- ✅ Cache headers for assets

## Important Notes

- **Node Version**: Your project requires Node >= 18.0.0
- **Build Output**: Files are built to `dist/myfirstproject/browser`
- **Routing**: All routes are handled by Angular Router (SPA mode)
- **Assets**: Static assets are cached for 1 year

## Troubleshooting

### Build Fails
- Check Node version: Vercel uses Node 18+ by default
- Verify `package.json` has correct build script
- Check build logs in Vercel dashboard

### 404 Errors on Routes
- Ensure `vercel.json` has the rewrite rule for SPA routing
- Check that `index.html` is in the output directory

### Assets Not Loading
- Verify assets are in `src/assets` folder
- Check that build includes assets correctly
- Clear browser cache

## Environment Variables (if needed)

If you need environment variables:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Continuous Deployment

Vercel automatically deploys on every push to your main branch. No additional setup needed!

