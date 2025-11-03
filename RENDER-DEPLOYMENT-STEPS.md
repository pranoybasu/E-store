# E-Store Backend Deployment to Render

## Step-by-Step Instructions

### 1. Create Render Account & Connect GitHub

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended) or email
4. Authorize Render to access your GitHub repositories

### 2. Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if not already connected
4. Find and select repository: **`pranoybasu/E-store`**
5. Click **"Connect"**

### 3. Configure Web Service Settings

Fill in the following configuration:

**Basic Settings:**
- **Name**: `e-store-backend` (or your preferred name)
- **Region**: Select closest to your location (e.g., Oregon USA, Frankfurt EU)
- **Branch**: `master`
- **Root Directory**: *Leave empty* (backend is at project root)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node backend/server.js`

**Instance Type:**
- Select **"Free"** ($0/month, 750 hours)

### 4. Add Environment Variables

Click **"Advanced"** button, then click **"Add Environment Variable"** for each:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://pranoy:pranoy@cluster0.tdp4y2h.mongodb.net/e-store?retryWrites=true&w=majority
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=sb
PORT=5000
```

**To add each variable:**
1. Click "+ Add Environment Variable"
2. Enter **Key** (e.g., `NODE_ENV`)
3. Enter **Value** (e.g., `production`)
4. Repeat for all 5 variables

### 5. Deploy

1. Click **"Create Web Service"** button at the bottom
2. Wait for deployment (5-10 minutes)
   - You'll see build logs in real-time
   - Wait for "Your service is live 🎉" message
3. **Copy your backend URL** (e.g., `https://e-store-backend.onrender.com`)

### 6. Verify Backend is Running

Once deployed, test your backend:
```
https://YOUR-BACKEND-URL.onrender.com/api/products
```

You should see JSON data with products.

---

## Important Notes

⚠️ **Free tier sleeps after 15 minutes of inactivity**
- First request after sleep takes ~30-60 seconds
- Keep alive services available if needed

✅ **Your backend URL will be:**
`https://e-store-backend.onrender.com` (or your chosen name)

📝 **Save this URL** - you'll need it for frontend deployment!

---

## Next Steps

After backend deployment completes:
1. Copy your backend URL
2. Proceed to Vercel frontend deployment
3. Configure frontend with backend URL