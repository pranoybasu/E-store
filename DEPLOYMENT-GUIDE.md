# E-Store Deployment Guide

## 🎯 Deployment Strategy

This guide covers deploying the E-Store MERN application using free hosting services:
- **Backend**: Render (Free tier - 750 hours/month)
- **Frontend**: Vercel (Unlimited free tier)
- **Database**: MongoDB Atlas (Free M0 tier - 512MB)

---

## 📋 Pre-Deployment Checklist

### Required Accounts (All Free)
- [ ] MongoDB Atlas account
- [ ] Render account
- [ ] Vercel account
- [ ] GitHub repository access

---

## 🗄️ Step 1: MongoDB Atlas Setup

### Create Free Cluster

1. **Sign up/Login** to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a New Project**
   - Name: `E-Store` or your preferred name

3. **Build a Database**
   - Choose: **M0 (Free tier)**
   - Cloud Provider: AWS, GCP, or Azure
   - Region: Choose closest to your target users
   - Cluster Name: `estore-cluster`

4. **Create Database User**
   - Username: `estore-admin` (or your choice)
   - Password: Generate a secure password
   - **IMPORTANT**: Save these credentials securely

5. **Network Access**
   - Click "Network Access" in sidebar
   - Add IP Address: **0.0.0.0/0** (Allow access from anywhere)
   - This is required for Render to access the database

6. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 4.1 or later
   - Copy connection string:
     ```
     mongodb+srv://<username>:<password>@estore-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your credentials
   - Add database name: `.../e-store-db?retryWrites...`

### Seed Initial Data

After deployment, you'll run:
```bash
npm run data:import
```

---

## 🔧 Step 2: Update Dependencies

### Backend Dependencies Update

Current versions are from 2020-2021. Update to latest compatible versions:

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "nodemon": "^3.0.2"
  }
}
```

### Frontend Dependencies Update

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.1",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-paypal-button-v2": "^2.6.3",
    "react-redux": "^9.0.4",
    "react-router-bootstrap": "^0.26.2",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "redux": "^5.0.0",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^3.1.0",
    "web-vitals": "^3.5.0"
  }
}
```

---

## 🚀 Step 3: Backend Deployment to Render

### 3.1 Add CORS Support

Create `backend/middleware/corsMiddleware.js`:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);
```

Update `backend/server.js` to include CORS:

```javascript
import corsMiddleware from './middleware/corsMiddleware.js'

// After other middleware
app.use(corsMiddleware)
```

### 3.2 Environment Variables for Render

Create `.env.example` file:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/e-store-db
JWT_SECRET=your_jwt_secret_here_use_random_string
PAYPAL_CLIENT_ID=your_paypal_client_id
FRONTEND_URL=https://your-frontend.vercel.app
```

### 3.3 Update package.json Scripts

Add to root `package.json`:

```json
{
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "data:import": "node backend/seeder",
    "data:destroy": "node backend/seeder -d",
    "build": "npm install && npm install --prefix frontend"
  }
}
```

### 3.4 Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - Name: `estore-backend`
   - Region: Choose closest to your users
   - Branch: `main` (or your default branch)
   - Root Directory: Leave empty (or `.` for root)
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: **Free**

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/e-store-db
   JWT_SECRET=generate_random_string_here_min_32_chars
   PAYPAL_CLIENT_ID=your_paypal_client_id_if_using
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your backend URL: `https://estore-backend.onrender.com`

6. **Seed Database**
   Once deployed, run the seeder:
   - Go to "Shell" tab in Render dashboard
   - Run: `npm run data:import`

---

## 🎨 Step 4: Frontend Deployment to Vercel

### 4.1 Update Frontend Configuration

Create `frontend/.env.production`:

```env
REACT_APP_API_URL=https://estore-backend.onrender.com
```

Update `frontend/package.json` to remove proxy in production:

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true
}
```

### 4.2 Update API Calls

Update axios base URL in frontend. Create `frontend/src/config.js`:

```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Update all API calls to use this base URL. Example for `frontend/src/actions/productActions.js`:

```javascript
import { API_URL } from '../config';
import axios from 'axios';

// Update all axios calls
const { data } = await axios.get(`${API_URL}/api/products`);
```

### 4.3 Deploy to Vercel

1. **Install Vercel CLI** (Optional, can use dashboard)
   ```bash
   npm i -g vercel
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/)**

3. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

4. **Configure Project**
   - Framework Preset: **Create React App**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. **Environment Variables**
   Add in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://estore-backend.onrender.com
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - Your frontend URL: `https://estore-frontend.vercel.app`

---

## 🔄 Step 5: Connect Frontend & Backend

### Update CORS on Backend

In Render dashboard, update environment variable:
```
FRONTEND_URL=https://your-actual-app.vercel.app
```

Redeploy the backend after this change.

### Test Connection

1. Open frontend URL
2. Check browser console for API calls
3. Verify no CORS errors
4. Test user registration
5. Test login
6. Test product display

---

## ✅ Step 6: Post-Deployment Testing

### Test Checklist

- [ ] Homepage loads correctly
- [ ] Products display with images
- [ ] User registration works
- [ ] User login works
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Order placement
- [ ] Admin panel access
- [ ] Product creation (admin)
- [ ] Order management (admin)

### Admin Account

Default admin credentials (from seeder):
- Email: `admin@example.com`
- Password: `123456`

**IMPORTANT**: Change these immediately after deployment!

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Fails**
- Verify connection string is correct
- Check IP whitelist (0.0.0.0/0)
- Ensure database user exists

**Render Service Won't Start**
- Check build logs in Render dashboard
- Verify all environment variables are set
- Check Node.js version compatibility

**API Routes Return 404**
- Verify routes are registered in server.js
- Check CORS configuration
- Examine server logs in Render

### Frontend Issues

**Cannot Connect to API**
- Verify REACT_APP_API_URL is set correctly
- Check CORS errors in browser console
- Ensure backend is deployed and running

**Build Fails on Vercel**
- Check build logs for specific errors
- Verify package.json dependencies
- Update to React 18 compatible packages

**Images Not Loading**
- Check image paths
- Verify uploads folder is accessible
- Consider using cloud storage (Cloudinary)

---

## 🔐 Security Best Practices

### Production Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Sanitize database queries
- [ ] Keep dependencies updated
- [ ] Monitor error logs
- [ ] Set up database backups

### Recommended JWT Secret Generation

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📊 Monitoring & Maintenance

### Free Monitoring Tools

- **Render**: Built-in metrics and logs
- **Vercel**: Analytics and performance insights
- **MongoDB Atlas**: Database monitoring
- **UptimeRobot**: Free uptime monitoring

### Regular Maintenance

- Weekly: Check error logs
- Monthly: Update dependencies
- Quarterly: Database backup
- As needed: Security patches

---

## 🚀 Performance Optimization

### Backend

- [ ] Enable Gzip compression
- [ ] Implement caching (Redis if needed)
- [ ] Optimize database queries
- [ ] Add pagination to product lists
- [ ] Use CDN for static assets

### Frontend

- [ ] Enable React production build
- [ ] Lazy load components
- [ ] Optimize images (WebP format)
- [ ] Implement code splitting
- [ ] Use service workers for caching

---

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment mode | production |
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection | mongodb+srv://... |
| JWT_SECRET | JWT signing key | random_string_32_chars |
| PAYPAL_CLIENT_ID | PayPal integration | AxxXxXxXxX |
| FRONTEND_URL | Frontend domain | https://app.vercel.app |

### Frontend (.env.production)

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | https://api.onrender.com |

---

## 🎉 Deployment Complete!

Once deployed, your E-Store will be accessible at:

- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-api.onrender.com`
- **Database**: MongoDB Atlas cluster

### Next Steps

1. Test all functionality thoroughly
2. Update README with live URLs
3. Document admin credentials securely
4. Set up monitoring
5. Plan future features
6. Consider custom domain (optional)

---

## 📞 Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment)

---

**Total Cost: $0/month** 🎉

**Deployment Time: ~1-2 hours** ⏱️