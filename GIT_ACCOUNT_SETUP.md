# Git Account Setup Guide

## ✅ Git Configuration Updated

Your git account has been updated:
- **Username**: HeinThiri
- **Email**: heinthiri2000@gmail.com

---

## Step 1: Clear Cached Credentials

Windows may have cached old credentials. Clear them:

### Option A: Using Windows Credential Manager (GUI)
1. Press `Win + R`
2. Type: `control /name Microsoft.CredentialManager`
3. Go to **Windows Credentials**
4. Find any `git:https://github.com` entries
5. Click **Remove** for each one

### Option B: Using Command Line
```powershell
# Clear GitHub credentials
cmdkey /list | Select-String "github"
# If you see any, remove them:
cmdkey /delete:git:https://github.com
```

---

## Step 2: Set Up Authentication

Choose one method:

### Method 1: Personal Access Token (Recommended)

1. **Create Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: "Portfolio Project"
   - Expiration: Choose your preference (90 days, 1 year, or no expiration)
   - Select scopes: ✅ **repo** (Full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Use Token:**
   ```bash
   git push origin main
   ```
   - Username: `HeinThiri`
   - Password: **Paste your token** (not your GitHub password)

3. **Save Token (Optional):**
   Windows Credential Manager will save it automatically after first use.

---

### Method 2: SSH Keys

1. **Check for existing SSH key:**
   ```bash
   ls ~/.ssh/id_*.pub
   ```

2. **Generate new SSH key (if needed):**
   ```bash
   ssh-keygen -t ed25519 -C "heinthiri2000@gmail.com"
   # Press Enter to accept default location
   # Press Enter for no passphrase (or set one)
   ```

3. **Copy public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the entire output
   ```

4. **Add to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Title: "My Portfolio Laptop"
   - Key: Paste your public key
   - Click "Add SSH key"

5. **Switch remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:HeinThiri/myfirstproject.git
   ```

6. **Test connection:**
   ```bash
   ssh -T git@github.com
   # Should say: "Hi HeinThiri! You've successfully authenticated..."
   ```

---

## Step 3: Verify Configuration

```bash
# Check git config
git config --global user.name
git config --global user.email

# Check remote
git remote -v

# Test authentication
git fetch origin
```

---

## Step 4: Push Your Code

After authentication is set up:

```bash
cd "d:\Hein Thiri\portfolio\myportfolio"
git push origin main --force-with-lease
```

---

## Current Git Settings

✅ **Username**: HeinThiri  
✅ **Email**: heinthiri2000@gmail.com  
✅ **Remote**: https://github.com/HeinThiri/myfirstproject.git

---

## Troubleshooting

### "Permission denied" error?
- Make sure you're using the correct GitHub account
- Clear cached credentials (Step 1)
- Use Personal Access Token (Method 1)

### "Authentication failed"?
- Token might be expired - generate a new one
- Check token has "repo" scope selected
- Make sure username is "HeinThiri" (not HeinThiriTun17)

### Want to use different email?
```bash
git config --global user.email "your-email@example.com"
```

### Want to use different username?
```bash
git config --global user.name "YourName"
```

---

## Next Steps

1. ✅ Git account updated
2. ⏭️ Clear cached credentials (Step 1)
3. ⏭️ Set up authentication (Step 2)
4. ⏭️ Push your code (Step 4)

