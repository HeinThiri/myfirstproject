# Quick Deployment Checklist

Use this checklist to ensure everything is ready for Vercel deployment.

## Pre-Deployment Checklist

- [ ] Code is committed and pushed to GitHub
- [ ] `vercel.json` exists and is configured correctly
- [ ] `api/server.mjs` exists
- [ ] `package.json` has build script: `"build": "ng build"`
- [ ] Project builds locally: `npm run build` (test this first!)
- [ ] No merge conflicts in README.md or other files

## Deployment Steps

1. [ ] Go to [vercel.com](https://vercel.com) and sign in
2. [ ] Click "Add New..." → "Project"
3. [ ] Import repository: `HeinThiri/myfirstproject`
4. [ ] Configure settings:
   - [ ] Framework: Other
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist/myfirstproject/browser`
   - [ ] Node Version: 20.x
5. [ ] Click "Deploy"
6. [ ] Wait for build to complete (2-5 minutes)
7. [ ] Test the deployed URL
8. [ ] Verify all pages work correctly

## Post-Deployment Verification

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Images/assets load properly
- [ ] SSR works (check page source)
- [ ] No console errors in browser
- [ ] Mobile responsive (if applicable)

## Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Build fails | Check build logs, test `npm run build` locally first |
| 404 errors | Verify `outputDirectory` in Vercel settings |
| Assets not loading | Check `angular.json` assets configuration |
| SSR not working | Verify `api/server.mjs` exists and `vercel.json` is correct |

## Your Project URLs

- **GitHub**: https://github.com/HeinThiri/myfirstproject
- **Vercel Dashboard**: https://vercel.com/hein-thiri-htuns-projects
- **Deployed Site**: Check Vercel dashboard after deployment

---

**Ready to deploy?** Follow the detailed guide in `VERCEL_DEPLOY_STEPS.md`

