# Deployment Guide - Snappy Chat App

## CORS Issues Resolution

The main cause of CORS errors after deployment is the hardcoded localhost URLs. This guide will help you fix these issues.

## Frontend Deployment (Vercel/Netlify/etc.)

### 1. Environment Variables

Set the following environment variable in your deployment platform:

```bash
VITE_API_URL=https://your-backend-url.com
```

**Examples:**
- For Vercel: Add in Project Settings → Environment Variables
- For Netlify: Add in Site Settings → Environment Variables
- For Railway: Add in Variables tab

### 2. Backend URL Configuration

Make sure your backend is deployed and accessible. Common platforms:
- Railway
- Render
- Heroku
- DigitalOcean App Platform

## Backend Deployment

### 1. Environment Variables

Set these environment variables in your backend deployment:

```bash
MONGOURL=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
```

### 2. CORS Configuration

The backend has been updated to handle CORS more flexibly. It will automatically allow:
- Your deployed frontend URL (via FRONTEND_URL env var)
- Common development URLs (localhost:3000, localhost:5173, etc.)
- The hardcoded Vercel URL (https://snappy-mga7.vercel.app)

## Common Issues & Solutions

### 1. CORS Error: "Access to fetch at 'http://localhost:5000' from origin 'https://your-app.vercel.app'"

**Solution:** Set the `VITE_API_URL` environment variable to your backend URL.

### 2. Socket.io Connection Failed

**Solution:** The Socket.io connection uses the same host configuration, so setting `VITE_API_URL` will fix this too.

### 3. Mixed Content Error (HTTP/HTTPS)

**Solution:** Ensure your backend is served over HTTPS in production.

## Testing Locally

1. **Frontend:** `npm run dev` (will use localhost:5000 by default)
2. **Backend:** `npm start` (runs on port 5000)

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend environment variable `VITE_API_URL` set
- [ ] Backend environment variable `FRONTEND_URL` set
- [ ] MongoDB connection string configured
- [ ] All environment variables properly set in deployment platform

## Troubleshooting

If you still get CORS errors:

1. Check browser console for the exact error message
2. Verify the `VITE_API_URL` is correctly set
3. Ensure your backend CORS configuration includes your frontend URL
4. Check that both frontend and backend are using HTTPS in production 