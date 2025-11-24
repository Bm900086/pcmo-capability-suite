# GitHub Authentication Setup

## Issue
Git is trying to use cached credentials for a different GitHub account (Balajiece15) instead of Bm900086.

## Solution: Use Personal Access Token

### Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Token name: `PCMO Project`
4. Expiration: Choose your preference (90 days recommended)
5. Select scopes: Check **`repo`** (Full control of private repositories)
6. Click **"Generate token"**
7. **IMPORTANT**: Copy the token immediately - you won't see it again!

### Step 2: Update Git Remote with Token

After you have your token, run this command (replace YOUR_TOKEN with your actual token):

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Bm900086/pcmo-capability-suite.git
```

Then push:
```bash
git push -u origin main
```

### Alternative: Use Token When Prompted

You can also keep the current remote and use the token when prompted:

1. Run: `git push -u origin main`
2. When prompted for username: Enter `Bm900086`
3. When prompted for password: Paste your Personal Access Token (not your GitHub password)

### Step 3: Store Credentials (Optional)

To avoid entering the token every time, you can store it:

```bash
git config --global credential.helper wincred
```

Then on the next push, enter your token once and it will be saved.

## Security Note

- Never commit your token to the repository
- If you accidentally commit a token, revoke it immediately on GitHub
- Tokens should be treated like passwords

