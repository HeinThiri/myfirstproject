# Fixing Vercel Deployment Error

Your deployment is showing an error. Here's how to diagnose and fix it.

## Step 1: Check the Build Logs

1. **In Vercel Dashboard**:
   - Click on the failed deployment (the one with red "Error" status)
   - Click on the deployment ID or "View Function Logs"
   - Scroll through the build logs to find the exact error

2. **Common Error Messages**:

### Error: "Cannot find module" or "Module not found"
- **Cause**: Missing dependencies or wrong import paths
- **Fix**: Ensure all dependencies are in `package.json`

### Error: "reqHandler is not defined" or "reqHandler not found"
- **Cause**: The Angular server module doesn't export `reqHandler` correctly
- **Fix**: See Step 2 below

### Error: "Build failed" or "ng build failed"
- **Cause**: TypeScript errors or missing files
- **Fix**: Test build locally first: `npm run build`

### Error: "Function timeout" or "Function error"
- **Cause**: Serverless function taking too long or crashing
- **Fix**: Check `api/server.mjs` configuration

---

## Step 2: Verify the Build Works Locally

**Before deploying, always test locally:**

```bash
# 1. Clean install dependencies
npm install

# 2. Build the project
npm run build

# 3. Check if dist folder is created correctly
ls dist/myfirstproject/server/server.mjs

# 4. Test SSR locally (optional)
npm run serve:ssr:myfirstproject
```

**If local build fails**, fix those errors first before deploying.

---

## Step 3: Common Fixes

### Fix 1: Update api/server.mjs

I've already updated your `api/server.mjs` file with better error handling. Make sure it's committed:

```bash
git add api/server.mjs
git commit -m "Fix Vercel serverless function"
git push origin main
```

### Fix 2: Ensure Production Build

Make sure Vercel is using the production build. In Vercel dashboard:
- **Build Command**: `npm run build` (should use production by default)
- Or explicitly: `npm run build:production`

### Fix 3: Check Node Version

In Vercel project settings:
- **Node.js Version**: Should be `20.x` (matches `vercel.json`)

### Fix 4: Verify File Structure

After build, these files should exist:
- `dist/myfirstproject/browser/` (static files)
- `dist/myfirstproject/server/server.mjs` (SSR server)
- `api/server.mjs` (Vercel function wrapper)

---

## Step 4: Alternative - Simpler Configuration (If SSR Still Fails)

If SSR continues to fail, you can deploy as a static site first:

### Option A: Static Site (No SSR)

1. **Update `vercel.json`**:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/myfirstproject/browser",
  "framework": null
}
```

2. **Remove SSR rewrites** - just serve static files
3. **This works for most Angular apps** without SSR requirements

### Option B: Keep SSR but Simplify

If you need SSR, the current configuration should work after the fixes above.

---

## Step 5: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **"Logs"** tab
3. Look for runtime errors when accessing the site
4. Common runtime errors:
   - Import errors
   - Path resolution issues
   - Missing environment variables

---

## Step 6: Debugging Steps

### 1. Check Build Output
```bash
# After build, verify structure:
dist/
  myfirstproject/
    browser/        # Static files
    server/         # SSR files
      server.mjs    # Must exist!
```

### 2. Test the Import
The `api/server.mjs` tries to import:
```javascript
import('../dist/myfirstproject/server/server.mjs')
```

Verify this path exists after build.

### 3. Check Exports
The Angular server should export `reqHandler`:
```javascript
// In dist/myfirstproject/server/server.mjs
export const reqHandler = ...
```

---

## Quick Fix Checklist

- [ ] Build works locally: `npm run build`
- [ ] `dist/myfirstproject/server/server.mjs` exists after build
- [ ] `api/server.mjs` is updated (already done)
- [ ] `vercel.json` is correct (already updated)
- [ ] All changes committed and pushed to GitHub
- [ ] Vercel project settings match:
  - Build Command: `npm run build`
  - Output Directory: `dist/myfirstproject/browser`
  - Node Version: `20.x`

---

## Still Having Issues?

1. **Share the exact error message** from Vercel build logs
2. **Check if local build works**: `npm run build`
3. **Try static deployment first** (remove SSR) to verify basic setup works
4. **Check Vercel documentation**: [Angular on Vercel](https://vercel.com/docs/frameworks/angular)

---

## Next Steps After Fix

Once deployment succeeds:
1. Test all pages on the deployed URL
2. Verify SSR is working (view page source)
3. Check browser console for errors
4. Test on mobile devices

---

**Remember**: Always check the Vercel build logs for the exact error message. That will tell us exactly what's wrong!

