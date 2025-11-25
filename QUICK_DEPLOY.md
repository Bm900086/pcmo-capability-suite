# Quick Deploy Guide - Get Your Site Live in 5 Minutes! 🚀

## Fastest Method: Vercel (Recommended)

### Prerequisites:
- ✅ Your code is on GitHub
- ✅ You have a GitHub account

### Steps:

1. **Test Build Locally** (Optional but recommended):
   ```bash
   npm run build
   ```
   If this works, you're ready!

2. **Go to Vercel**:
   - Open: https://vercel.com
   - Click "Sign Up" → Choose "Continue with GitHub"
   - Authorize Vercel to access your repositories

3. **Import Your Project**:
   - Click "Add New..." → "Project"
   - Find "PCMO Cursor Project" in your repositories
   - Click "Import"

4. **Configure** (Vercel auto-detects, but verify):
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Deploy**:
   - Click "Deploy"
   - Wait ~2 minutes
   - ✅ Your site is LIVE!

6. **Get Your URL**:
   - Vercel gives you: `https://pcmo-cursor-project.vercel.app`
   - Share this URL with anyone!

---

## Alternative: Netlify (Just as Easy)

1. **Go to**: https://netlify.com
2. **Sign up** with GitHub
3. **Click**: "Add new site" → "Import an existing project"
4. **Select**: Your GitHub repository
5. **Settings** (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Click**: "Deploy site"
7. **Done!** Your site is live at `https://your-project.netlify.app`

---

## What Happens Next?

### Automatic Updates:
- Every time you push to GitHub, your site automatically updates!
- No manual deployment needed

### Custom Domain (Optional):
1. In Vercel/Netlify dashboard
2. Go to Settings → Domains
3. Add your custom domain (e.g., `yourdomain.com`)
4. Follow the DNS instructions
5. Free SSL certificate included!

---

## Backend Deployment (If Needed)

Your Python backend needs separate hosting:

### Railway (Easiest):
1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Set root directory to: `rag_service`
6. Railway auto-detects Python and deploys!

### Update Frontend API URL:
After backend is deployed, update your frontend to point to the backend URL.

---

## Troubleshooting

**Build fails?**
- Run `npm run build` locally first
- Check error messages
- Ensure all dependencies are in `package.json`

**404 errors on refresh?**
- The `vercel.json` and `netlify.toml` files I created handle this
- They redirect all routes to `index.html` for React Router

**API not working?**
- Make sure backend is deployed
- Update API URLs in your code
- Check CORS settings

---

## Need Help?

- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://www.netlify.com/support/

---

## Summary

✅ **Frontend**: Deploy to Vercel (free, automatic)
✅ **Backend**: Deploy to Railway (free tier available)
✅ **Result**: Professional, scalable website for FREE!

**Time to deploy**: ~5 minutes
**Cost**: $0 (free tier)

