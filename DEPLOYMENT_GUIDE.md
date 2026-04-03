# Deploying Intellivation Solutions Website to Render

## Prerequisites
- A GitHub account (free)
- This repository pushed to GitHub

## Step-by-Step Deployment Guide

### Step 1: Configure Git (First Time Only)
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** button (top right) → **"New repository"**
3. Repository name: `intellivation-website` (or your choice)
4. Description: "Intellivation Solutions - AI Company Website"
5. Choose **Public** or **Private**
6. **Do NOT** initialize with README (you already have one)
7. Click **"Create repository"**

### Step 3: Push Your Code to GitHub

GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/intellivation-website.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 4: Deploy on Render

1. Go to [Render](https://render.com) and sign up/sign in
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub account (authorize Render to access your repos)
4. Select your `intellivation-website` repository
5. Configure the deployment:

   **Basic Settings:**
   - **Name**: `intellivation-solutions` (or your choice)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `.` if required)
   - **Build Command**: Leave empty (static HTML doesn't need building)
   - **Publish Directory**: `.` (current directory - all HTML files are at root)

6. Click **"Create Static Site"**

### Step 5: Your Site is Live! 🎉

- Render will deploy your site automatically
- You'll get a free URL like: `https://intellivation-solutions.onrender.com`
- Every time you push to GitHub, Render auto-deploys the changes

## Custom Domain (Optional)

To use your own domain (e.g., `www.intellinovasolutions.com`):

1. In Render dashboard, go to your site settings
2. Click **"Custom Domain"**
3. Add your domain name
4. Follow the DNS configuration instructions
5. Point your domain's DNS to Render's servers

## File Structure

Your website has these pages:
```
├── index.html              # Home page
├── projects.html           # Projects overview
├── calorai.html           # CalorAI product page
├── calorai-privacy.html   # CalorAI privacy policy
├── calorai-terms.html     # CalorAI terms & conditions
├── calorai-how-it-works.html  # CalorAI guide
├── juridikai.html         # Juridik AI page
├── realify.html           # Realify page
├── about.html             # About us
├── contact.html           # Contact page
├── styles.css             # All styling
├── script.js              # JavaScript functionality
└── assets/                # Images and media
```

## Making Updates

After deployment, to update your website:

```bash
# Make your changes to the files
# Then:
git add .
git commit -m "Description of your changes"
git push
```

Render will automatically detect the changes and redeploy within 1-2 minutes.

## Alternative: Deploy Without GitHub

If you prefer not to use GitHub, you can:
1. Use Render's **"Deploy from Git"** with GitLab or Bitbucket
2. Use **Netlify Drop** - just drag and drop your folder
3. Use **Vercel** - similar to Render
4. Use **GitHub Pages** (free static hosting)

## Troubleshooting

**Issue**: 404 errors on page navigation
**Solution**: All your HTML files are at the root, so links should work. Ensure all href paths are correct.

**Issue**: CSS/JS not loading
**Solution**: Your CSS and JS files are at root level, so all pages reference them correctly with `styles.css` and `script.js`.

**Issue**: Images not showing
**Solution**: Check that the `assets/` folder is included in your Git repository.

## Support

- Render Docs: https://render.com/docs/static-sites
- GitHub Help: https://docs.github.com
- Contact: info@intellinovasolutions.com

---

**Note**: Your current Git repository is already initialized and files are staged. Just configure Git user, commit, and push to GitHub!
