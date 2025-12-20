# Quick Deployment Guide - Angular to GitHub

## Current Status
✅ GitHub Actions workflow created  
✅ Project configured for GitHub Pages  
✅ Files ready to commit  
⚠️ Need to resolve authentication to push

---

## Step 1: Fix Authentication

You have two options:

### Option A: Use Personal Access Token (HTTPS) - EASIEST

1. **Switch back to HTTPS:**
   ```bash
   git remote set-url origin https://github.com/HeinThiri/myfirstproject.git
   ```

2. **Create Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "Portfolio Deployment"
   - Select scopes: ✅ `repo` (full control)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

3. **Push using token:**
   ```bash
   git push origin main --force-with-lease
   ```
   - Username: `HeinThiri`
   - Password: **Paste your token** (not your GitHub password)

---

### Option B: Set Up SSH Keys

1. **Check if you have SSH key:**
   ```bash
   ls ~/.ssh/id_rsa.pub
   ```

2. **If no key exists, generate one:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default location
   # Press Enter twice for no passphrase (or set one)
   ```

3. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_rsa.pub
   # Copy the entire output
   ```

4. **Add to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Title: "My Portfolio Laptop"
   - Key: Paste your public key
   - Click "Add SSH key"

5. **Test connection:**
   ```bash
   ssh -T git@github.com
   ```

6. **Push:**
   ```bash
   git push origin main --force-with-lease
   ```

---

## Step 2: Push Your Code

After fixing authentication, run:

```bash
cd "d:\Hein Thiri\portfolio\myportfolio"
git push origin main --force-with-lease
```

**Note:** `--force-with-lease` safely overwrites remote if your local is newer. If you prefer to merge instead:
```bash
git pull origin main --allow-unrelated-histories
# Resolve any conflicts if they occur
git push origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to: https://github.com/HeinThiri/myfirstproject
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **"GitHub Actions"**
4. Click **Save**

---

## Step 4: Verify Deployment

1. Go to **Actions** tab in your repository
2. You should see "Build and Deploy" workflow running
3. Wait 2-5 minutes for it to complete
4. Your site will be live at: **https://heinthiri.github.io/myfirstproject/**

---

## What's Already Configured

✅ `.github/workflows/build-and-deploy.yml` - Automated build & deploy  
✅ `angular.json` - Base href set to `/myfirstproject/`  
✅ `package.json` - Deploy script ready  
✅ All project files committed locally

---

## Troubleshooting

### "Permission denied" error?
- Use Personal Access Token (Option A above)
- Or set up SSH keys (Option B above)

### "Branch diverged" warning?
- Use `--force-with-lease` to push (keeps your local changes)
- Or use `git pull` first to merge remote changes

### Build fails in Actions?
- Check Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify Node.js version (workflow uses Node 20)

---

## After Successful Push

✅ Code is on GitHub  
✅ GitHub Actions will auto-build  
✅ Enable Pages (Step 3)  
✅ Site goes live automatically!

