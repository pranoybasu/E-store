# E-Store Backend Deployment to Railway

## Why Railway?
- ✅ **No credit card required** for free tier
- ✅ $5 free credit per month
- ✅ 500 hours of usage
- ✅ Perfect for hobby projects

---

## Step-by-Step Instructions

### 1. Create Railway Account

1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Select **"Login with GitHub"**
4. Authorize Railway to access your GitHub

### 2. Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Configure GitHub App"**
4. Grant Railway access to your repositories
5. Select **`pranoybasu/E-store`** repository

### 3. Configure Deployment

Railway will auto-detect your Node.js app.

**Important Configuration:**
1. Click on the deployed service
2. Go to **"Settings"** tab
3. Set **"Root Directory"**: Leave empty (backend at root)
4. Set **"Start Command"**: `node backend/server.js`
5. Set **"Build Command"**: `npm install`

### 4. Add Environment Variables

1. Click **"Variables"** tab
2. Click **"New Variable"** and add each:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://pranoy:pranoy@cluster0.tdp4y2h.mongodb.net/e-store?retryWrites=true&w=majority
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=sb
PORT=5000
```

**To add each:**
- Click "+ New Variable"
- Enter Variable name (e.g., `NODE_ENV`)
- Enter Value (e.g., `production`)
- Repeat for all 5 variables

### 5. Generate Domain

1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"**
4. Railway will create a public URL like: `https://e-store-production.up.railway.app`

### 6. Deploy

1. Railway auto-deploys on variable changes
2. Check **"Deployments"** tab for build progress
3. Wait for "Success" status (3-5 minutes)
4. **Copy your backend URL** from the Domains section

### 7. Verify Backend

Test your deployed backend:
```
https://YOUR-APP.up.railway.app/api/products
```

You should see JSON response with products.

---

## Important Notes

💰 **Free Tier Limits:**
- $5 credit per month
- ~500 execution hours
- Enough for 1-2 hobby projects

⚡ **No Sleep:**
- Unlike Render, Railway doesn't sleep inactive apps
- Faster response times

🔄 **Auto Deployments:**
- Every push to `master` triggers new deployment
- Check "Deployments" tab for status

---

## Troubleshooting

### Deployment Failed?
- Check "Deployments" tab for error logs
- Verify all environment variables are set
- Ensure `node backend/server.js` works locally

### Port Issues?
- Railway automatically assigns PORT
- Our app uses `process.env.PORT || 5000`
- Should work automatically

### Can't Access API?
- Verify domain is generated
- Check deployment status is "Success"
- Try accessing `/api/products` endpoint

---

## Monitor Usage

1. Go to Railway dashboard
2. Click your project
3. Check **"Usage"** tab
4. Monitor your $5 credit consumption

**Typical Usage:**
- Small MERN app: ~$1-2/month
- Well within free tier limits

---

## Next Steps

After successful deployment:
1. ✅ Copy your Railway backend URL
2. ✅ Proceed to Vercel frontend deployment
3. ✅ Use Railway URL as `REACT_APP_API_URL`

Your backend URL will look like:
```
https://e-store-production.up.railway.app
```

**Save this URL** - you'll need it for Vercel!