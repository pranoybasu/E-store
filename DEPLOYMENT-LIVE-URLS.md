# E-Store - Live Deployment URLs

## 🌐 Production URLs

### Frontend (Vercel)
**Live URL:** Coming soon - Configure `REACT_APP_API_URL` first
- Platform: Vercel
- Auto-deploys from: `master` branch
- Repository: https://github.com/pranoybasu/E-store

### Backend API (Railway)
**Live URL:** https://e-storebackend.up.railway.app/
- Platform: Railway.app
- Health Check: https://e-storebackend.up.railway.app/api/products
- Repository: https://github.com/pranoybasu/E-store

### Database (MongoDB Atlas)
**Cluster:** E-Store Production Cluster
- Platform: MongoDB Atlas (Free M0 tier)
- Region: Configured in MongoDB Atlas dashboard
- Connection: Via MONGO_URI environment variable

---

## 🔧 Configuration Status

### Backend (Railway) ✅
- [x] Deployed to Railway
- [x] Environment variables configured
- [x] Connected to MongoDB Atlas
- [x] Domain generated: https://e-storebackend.up.railway.app/

### Frontend (Vercel) ⏳
- [x] Deployed to Vercel
- [x] Build successful with `--legacy-peer-deps` fix
- [ ] **ACTION NEEDED:** Configure `REACT_APP_API_URL` environment variable
- [ ] Redeploy after environment variable is set

---

## 📋 Next Steps to Complete Deployment

### 1. Configure Vercel Environment Variable

1. Go to **Vercel Dashboard** (https://vercel.com/dashboard)
2. Select your **E-Store project**
3. Navigate to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://e-storebackend.up.railway.app`
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**

### 2. Trigger Vercel Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots (⋯) → **Redeploy**
4. Wait for build to complete
5. Your frontend will now connect to the Railway backend

### 3. Test the Application

Once redeployed, test these features:
- [ ] Homepage loads with products
- [ ] Product details page
- [ ] Add to cart
- [ ] User registration
- [ ] User login
- [ ] Checkout flow
- [ ] Admin panel access

**Test Credentials:**
- **Regular User:** john@email.com / 123456
- **Admin User:** admin@email.com / 123456

---

## 🔐 Environment Variables Reference

### Backend (Railway)
```
NODE_ENV=production
MONGO_URI=<MongoDB Atlas connection string>
JWT_SECRET=<your-secret-key>
PAYPAL_CLIENT_ID=<paypal-sandbox-client-id>
PORT=5000
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://e-storebackend.up.railway.app
```

---

## 📚 Documentation Files

- **MongoDB Setup:** [`MONGODB-ATLAS-SETUP.md`](MONGODB-ATLAS-SETUP.md)
- **Railway Deployment:** [`RAILWAY-DEPLOYMENT-STEPS.md`](RAILWAY-DEPLOYMENT-STEPS.md)
- **Vercel Deployment:** [`VERCEL-DEPLOYMENT-STEPS.md`](VERCEL-DEPLOYMENT-STEPS.md)
- **PayPal Setup:** [`PAYPAL-SANDBOX-SETUP.md`](PAYPAL-SANDBOX-SETUP.md)
- **General Deployment Guide:** [`DEPLOYMENT-GUIDE.md`](DEPLOYMENT-GUIDE.md)

---

## 🚀 Deployment Architecture

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ HTTPS
         ▼
┌─────────────────────────┐
│  Vercel (Frontend)      │
│  React SPA              │
│  Static Files + CDN     │
└────────┬────────────────┘
         │
         │ API Calls (HTTPS)
         │ REACT_APP_API_URL
         ▼
┌─────────────────────────┐
│  Railway (Backend)      │
│  Node.js + Express      │
│  REST API               │
└────────┬────────────────┘
         │
         │ MongoDB Connection
         │ MONGO_URI
         ▼
┌─────────────────────────┐
│  MongoDB Atlas          │
│  Cloud Database (M0)    │
│  512MB Storage          │
└─────────────────────────┘
```

---

## 🎯 Features Deployed

- ✅ Full-stack MERN e-commerce application
- ✅ User authentication with JWT
- ✅ Product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Admin dashboard for product/user/order management
- ✅ PayPal payment integration (sandbox)
- ✅ Responsive design (mobile-friendly)
- ✅ Review and rating system

---

## 💡 Free Tier Limitations

### Railway
- $5/month free credit (~500 hours runtime)
- Shared CPU and 512MB RAM
- Sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds

### Vercel
- Unlimited bandwidth and deployments
- 100GB bandwidth per month
- Automatic HTTPS
- No sleep/cold starts

### MongoDB Atlas
- 512MB storage (M0 tier)
- Shared cluster
- No backups on free tier
- 100 max connections

---

## 📝 Maintenance Notes

### Monitoring Backend Health
Check if backend is alive:
```bash
curl https://e-storebackend.up.railway.app/api/products
```

### Checking Logs
- **Railway:** Dashboard → Deployments → View Logs
- **Vercel:** Dashboard → Deployments → Function Logs

### Updating Code
Both platforms auto-deploy on push to `master`:
```bash
git add .
git commit -m "Your changes"
git push origin master
```

---

## ✅ Deployment Checklist

- [x] MongoDB Atlas cluster created
- [x] Backend deployed to Railway
- [x] Backend environment variables configured
- [x] Backend health check passing
- [x] Frontend deployed to Vercel
- [x] Build issues resolved (peer dependencies)
- [ ] Frontend environment variable configured
- [ ] Frontend redeployed with backend URL
- [ ] End-to-end testing completed
- [ ] Admin credentials verified
- [ ] PayPal sandbox tested

---

**Last Updated:** October 31, 2024  
**Status:** Backend deployed ✅ | Frontend needs env config ⏳