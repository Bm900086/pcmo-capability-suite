# Website Hosting & Deployment Guide

## Overview
Your project has two parts:
1. **Frontend**: React/Vite application (this guide)
2. **Backend**: Python FastAPI service (separate deployment needed)

---

## Option 1: Vercel (Recommended - Easiest)

### Why Vercel?
- ✅ Free tier with generous limits
- ✅ Automatic deployments from GitHub
- ✅ Built-in CDN and SSL
- ✅ Perfect for React/Vite apps
- ✅ Zero configuration needed

### Steps:

1. **Build your project locally first** (to test):
   ```bash
   npm run build
   ```

2. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

4. **Configuration** (Vercel auto-detects, but you can verify):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Custom Domain (Optional):
- In Vercel dashboard → Project → Settings → Domains
- Add your custom domain
- Vercel provides free SSL automatically

---

## Option 2: Netlify (Alternative)

### Steps:

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Drag and drop your `dist` folder, OR
   - Connect to GitHub for continuous deployment

3. **Configuration**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

---

## Option 3: GitHub Pages (Free but requires setup)

### Steps:

1. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://YOUR_USERNAME.github.io/PCMO-Cursor-Project"
   }
   ```

3. **Update vite.config.js**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/PCMO-Cursor-Project/', // Your repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## Option 4: Traditional Web Hosting

If you have a web server (cPanel, shared hosting, VPS):

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload contents of `dist` folder** to your web server's `public_html` or `www` directory

3. **Configure server**:
   - Ensure your server supports SPA (Single Page Applications)
   - Add `.htaccess` file for Apache:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## Backend Deployment (Separate)

Your Python FastAPI backend needs separate hosting:

### Option A: Railway (Recommended)
- Go to [railway.app](https://railway.app)
- Connect GitHub repo
- Select `rag_service` folder
- Railway auto-detects Python and installs dependencies
- Free tier available

### Option B: Render
- Go to [render.com](https://render.com)
- Create new Web Service
- Connect GitHub repo
- Point to `rag_service` folder
- Free tier available

### Option C: Heroku
- Go to [heroku.com](https://heroku.com)
- Create new app
- Connect GitHub
- Deploy from `rag_service` folder

### Backend Environment Variables:
Make sure to set:
- `OLLAMA_BASE_URL` (if using Ollama)
- Any API keys or secrets

---

## Quick Start: Deploy to Vercel (Recommended)

### Step-by-Step:

1. **Ensure your code is on GitHub**:
   ```bash
   git status
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to Vercel**:
   - Visit: https://vercel.com
   - Click "Sign Up" → Use GitHub
   - Authorize Vercel

3. **Import Project**:
   - Click "Add New Project"
   - Select your repository
   - Vercel will auto-detect:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

4. **Wait for deployment** (~2 minutes)

5. **Your site is live!**
   - Vercel provides a URL like: `your-project.vercel.app`
   - You can add a custom domain later

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test navigation between pages
- [ ] Verify API calls work (if backend is deployed)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Set up custom domain (optional)
- [ ] Configure environment variables (if needed)

---

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution**: Configure your hosting to redirect all routes to `index.html` (SPA routing)

### Issue: API calls failing
**Solution**: 
- Ensure backend is deployed and accessible
- Update API URLs in frontend to point to backend URL
- Check CORS settings on backend

### Issue: Build fails
**Solution**:
- Run `npm run build` locally to see errors
- Check Node.js version (should be 16+)
- Ensure all dependencies are in `package.json`

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## Recommended: Vercel + Railway

**Frontend (Vercel)**:
- Free, fast, automatic deployments
- Perfect for React/Vite

**Backend (Railway)**:
- Free tier available
- Easy Python deployment
- Auto-scaling

This combination gives you a professional, scalable setup for free!

