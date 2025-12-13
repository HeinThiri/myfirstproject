# Vercel Deployment Guide for Angular Portfolio

This guide will help you deploy your Angular portfolio website to Vercel and set up a custom domain.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. Your domain name (if you want to use a custom domain)

## Step 1: Prepare Your Project

Your project is already configured with:
- ✅ `vercel.json` - Vercel configuration file
- ✅ `api/server.mjs` - Serverless function for Angular SSR
- ✅ Production build script

## Step 2: Push to Git Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   ```

2. Create a repository on GitHub/GitLab/Bitbucket

3. Push your code:
   ```bash
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository:
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Find and select your portfolio repository
   - Click **"Import"**
4. Configure the project:
   - **Framework Preset**: Leave as "Other" (we have custom config)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist/myfirstproject/browser` (should auto-detect from vercel.json)
   - **Install Command**: `npm install` (default)
5. Click **"Deploy"**
6. Wait for the deployment to complete (usually 2-5 minutes)

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 4: Set Up Custom Domain

### 4.1 Add Domain in Vercel

1. Go to your project dashboard on Vercel
2. Click on **"Settings"** tab
3. Click on **"Domains"** in the left sidebar
4. Enter your domain name (e.g., `yourdomain.com` or `www.yourdomain.com`)
5. Click **"Add"**

### 4.2 Configure DNS Records

Vercel will show you the DNS records you need to add. You have two options:

#### Option A: Use Vercel's Nameservers (Easiest)

1. In your domain registrar (where you bought the domain), change the nameservers to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
2. Wait for DNS propagation (can take up to 24-48 hours, usually much faster)

#### Option B: Add DNS Records Manually

If you want to keep your current nameservers, add these DNS records:

**For Root Domain (yourdomain.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (or the IP Vercel provides)

**For WWW Subdomain (www.yourdomain.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com.` (or the CNAME Vercel provides)

**Alternative - Using CNAME for Root (if your DNS provider supports it):**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com.`

### 4.3 Verify Domain

1. After adding DNS records, Vercel will automatically verify your domain
2. You can check the status in the Vercel dashboard under **"Domains"**
3. Once verified (green checkmark), your site will be live on your custom domain!

## Step 5: SSL Certificate

- Vercel automatically provides free SSL certificates for all domains
- SSL is enabled automatically once your domain is verified
- No additional configuration needed

## Step 6: Environment Variables (If Needed)

If your app uses environment variables:

1. Go to **"Settings"** → **"Environment Variables"**
2. Add your variables:
   - Variable name: `YOUR_VAR_NAME`
   - Value: `your_value`
   - Environment: Select where to apply (Production, Preview, Development)
3. Click **"Save"**
4. Redeploy your project for changes to take effect

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure `node_modules` is not in `.gitignore` incorrectly
- Verify all dependencies are in `package.json`

### Domain Not Working

- Wait 24-48 hours for DNS propagation
- Check DNS records are correct using tools like `dig` or online DNS checkers
- Verify domain is added correctly in Vercel dashboard

### SSR Not Working

- Check that `api/server.mjs` exists
- Verify `vercel.json` configuration is correct
- Check serverless function logs in Vercel dashboard

### Static Assets Not Loading

- Ensure `outputDirectory` in `vercel.json` points to `dist/myfirstproject/browser`
- Check that assets are included in the build output

## Useful Commands

```bash
# Build locally to test
npm run build

# Test SSR locally
npm run serve:ssr:myfirstproject

# Deploy to Vercel (production)
vercel --prod

# View deployment logs
vercel logs
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Angular Deployment Guide](https://angular.dev/guide/deployment)
- [Vercel Domain Configuration](https://vercel.com/docs/concepts/projects/domains)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Vercel documentation
3. Check Angular build output locally
4. Contact Vercel support if needed

---

**Your portfolio will be live at:** `https://your-project-name.vercel.app` (or your custom domain)

Happy deploying! 🚀

