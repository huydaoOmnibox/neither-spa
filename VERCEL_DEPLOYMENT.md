# Vercel Deployment Guide

## Prerequisites
1. Create a [Vercel account](https://vercel.com/signup)
2. Install Vercel CLI: `npm i -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel CLI
1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy from project root:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name: `nails-spa-website` (or your preferred name)
   - Directory: `.` (current directory)
   - Override settings? **N**

### Option 2: Deploy via GitHub (Recommended)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
6. Click "Deploy"

## Environment Variables
If you need environment variables:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add any required variables

## Custom Domain (Optional)
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain

## Project Configuration

The following files have been configured for Vercel deployment:

- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Updated build scripts
- ✅ `vite.config.ts` - Optimized for production
- ✅ `.vercelignore` - Excludes unnecessary files
- ✅ `api/` - Serverless API functions

## Features Included
- 🎨 Responsive nail spa website
- 📱 Mobile-friendly navigation
- 🖼️ Optimized images
- ⚡ Fast loading with Vite
- 🔗 SPA routing with Wouter
- 🎯 SEO-friendly structure

## Post-Deployment
Your website will be available at: `https://your-project-name.vercel.app`

## Troubleshooting
- If images don't load, check the Unsplash URLs
- For routing issues, ensure all links use relative paths
- Check Vercel function logs for API errors 