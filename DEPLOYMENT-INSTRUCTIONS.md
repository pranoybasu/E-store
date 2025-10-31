# E-Store Deployment Instructions

## Prerequisites Completed ✅

1. ✅ MongoDB Atlas cluster created and configured
2. ✅ Database seeded with sample data
3. ✅ Dependencies updated to latest versions
4. ✅ Environment variables configured locally

## Current Configuration

### MongoDB Atlas
- **Connection String**: `mongodb+srv://adminEstore:00nsy1q09sbeSGpc@e-storedb.tdp4y2h.mongodb.net/estore?retryWrites=true&w=majority&appName=e-storeDB`
- **Database Name**: `estore`
- **Status**: ✅ Connected and seeded

### Admin Credentials (for testing)
- **Email**: john@example.com
- **Password**: 123456

## Deployment Steps

### Step 1: Deploy Backend to Render

1. **Push code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - E-Store ready for deployment"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**:
   - Go to https://render.com/
   - Sign up with GitHub

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `E-store` repository

4. **Configure Web Service**:
   - **Name**: `estore-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `.` if required)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://adminEstore:00nsy1q09sbeSGpc@e-storedb.tdp4y2h.mongodb.net/estore?retryWrites=true&w=majority&appName=e-storeDB
   JWT_SECRET=your_secure_random_string_here
   PAYPAL_CLIENT_ID=sb
   FRONTEND_URL=https://estore-frontend.vercel.app
   ```

   **IMPORTANT**: Generate a new `JWT_SECRET` using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete (~5-10 minutes)
   - Note the deployed URL (e.g., `https://estore-backend.onrender.com`)

7. **Seed Production Database** (one-time):
   ```bash
   # Use Render Shell or run locally with production MONGO_URI
   npm run data:import
   ```

### Step 2: Deploy Frontend to Vercel

1. **Update Frontend Environment Variable**:
   - Create `frontend/.env.production` with your actual Render backend URL:
   ```
   REACT_APP_API_URL=https://estore-backend.onrender.com
   ```

2. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

3. **Deploy via Vercel Dashboard**:
   - Go to https://vercel.com/
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install --legacy-peer-deps`

4. **Add Environment Variables** (in Vercel):
   ```
   REACT_APP_API_URL=https://estore-backend.onrender.com
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Note the deployed URL (e.g., `https://estore-frontend.vercel.app`)

### Step 3: Update Backend CORS Settings

After getting your Vercel frontend URL, update the backend environment variable on Render:

1. Go to Render Dashboard → Your Web Service
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-actual-vercel-url.vercel.app
   ```
3. Render will automatically redeploy with new settings

### Step 4: Testing

Test the following functionality:

1. **Homepage**: View all products
2. **Product Details**: Click on a product
3. **Search**: Search for "iPhone"
4. **Cart**: Add products to cart
5. **User Registration**: Create a new account
6. **User Login**: Login with credentials
7. **Checkout**: Complete an order
8. **Admin Login**: Login with admin credentials
   - Email: `john@example.com`
   - Password: `123456`
9. **Admin Panel**: View orders, products, users
10. **Product Management**: Create/Edit/Delete products

## Important Notes

### Render Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- 750 hours/month free (enough for 1 service running 24/7)

### Vercel Free Tier
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN

### Security Recommendations

1. **Change Default Admin Password**:
   - Login as admin
   - Go to Profile
   - Update password

2. **Update JWT Secret**:
   - Generate a strong random secret
   - Update in Render environment variables

3. **MongoDB Atlas**:
   - Keep database user password secure
   - Consider updating password periodically
   - Use IP whitelist for production (currently set to 0.0.0.0/0 for development)

4. **PayPal Integration**:
   - Update `PAYPAL_CLIENT_ID` with your actual PayPal sandbox/production credentials
   - Configure PayPal webhook URLs

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**Problem**: Database connection failed
- Verify MongoDB Atlas cluster is running
- Check network access settings (IP whitelist)
- Test connection string locally

**Problem**: CORS errors
- Verify `FRONTEND_URL` matches actual Vercel URL
- Check CORS middleware in `backend/server.js`

### Frontend Issues

**Problem**: Can't connect to backend
- Verify `REACT_APP_API_URL` environment variable
- Check browser console for errors
- Ensure backend is deployed and running

**Problem**: Build fails
- Use `--legacy-peer-deps` flag in install command
- Check Vercel build logs
- Verify all dependencies are in `package.json`

**Problem**: 404 on refresh
- Verify `vercel.json` rewrites configuration
- Check deployment settings

## Monitoring

### Backend Monitoring
- **Render Dashboard**: https://dashboard.render.com/
- Check service status, logs, and metrics
- Free tier includes basic monitoring

### Frontend Monitoring
- **Vercel Dashboard**: https://vercel.com/dashboard
- View deployment status, analytics, and logs
- Monitor bandwidth usage

## Next Steps

1. ✅ Backend deployed to Render
2. ✅ Frontend deployed to Vercel
3. ✅ Test all functionality
4. Update portfolio with live URLs
5. Take screenshots for portfolio
6. Consider custom domain (optional)

## Live URLs

Once deployed, update these:

- **Frontend**: https://your-frontend.vercel.app
- **Backend API**: https://your-backend.onrender.com
- **Admin Panel**: https://your-frontend.vercel.app/admin

## Support

For issues:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/