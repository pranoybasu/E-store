# E-Store Frontend Deployment to Vercel

## Prerequisites

✅ Backend must be deployed to Render first
✅ You need your backend URL (e.g., `https://e-store-backend.onrender.com`)

---

## Step-by-Step Instructions

### 1. Create Vercel Account & Connect GitHub

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Select **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub repositories

### 2. Import Project

1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. Click **"Import"** next to **`pranoybasu/E-store`** repository
   - If you don't see it, click "Adjust GitHub App Permissions" and grant access

### 3. Configure Project Settings

**Framework Preset:**
- Vercel should auto-detect: **Create React App**

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Enter: `frontend`
- Click **"Continue"**

**Build Settings (auto-filled):**
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

### 4. Add Environment Variables

Click **"Environment Variables"** section and add:

**Key:** `REACT_APP_API_URL`  
**Value:** `https://YOUR-BACKEND-URL.onrender.com`  
*(Replace with your actual Render backend URL)*

**Example:**
```
REACT_APP_API_URL=https://e-store-backend.onrender.com
```

⚠️ **IMPORTANT:** 
- Must start with `REACT_APP_`
- No trailing slash at the end
- Use your actual Render URL from previous step

### 5. Deploy

1. Click **"Deploy"** button
2. Wait for build & deployment (3-5 minutes)
   - You'll see build logs in real-time
   - Wait for "Congratulations!" message
3. **Copy your frontend URL** (e.g., `https://e-store-abc123.vercel.app`)

### 6. Verify Frontend is Running

Once deployed, visit your Vercel URL:
```
https://YOUR-APP.vercel.app
```

You should see the E-Store homepage with products loaded from your backend.

---

## Testing Checklist

After deployment, test these features:

- [ ] Homepage loads with products
- [ ] Product details page works
- [ ] Add to cart functionality
- [ ] User registration
- [ ] User login
- [ ] Checkout flow
- [ ] Admin panel (login as admin)

**Test Accounts:**
- **User**: john@email.com / 123456
- **Admin**: admin@email.com / 123456

---

## Troubleshooting

### Products not loading?
- Verify `REACT_APP_API_URL` is correct
- Check Render backend is awake (visit `/api/products`)
- Check browser console for CORS errors

### Backend sleeping?
- Free tier sleeps after 15 min inactivity
- First load takes 30-60 seconds to wake up
- Refresh page after backend wakes

### Build failed with peer dependency errors?
If you see errors like:
```
npm error ERESOLVE could not resolve
npm error peer react@"^0.14.6 || 15.x.x || 16.x.x || 17.x.x" from react-paypal-button-v2@2.6.3
```

**Solution**: The project includes fixes for React 18 compatibility:
- `.npmrc` file with `legacy-peer-deps=true`
- `vercel.json` with `"installCommand": "npm install --legacy-peer-deps"`

These are already committed and Vercel will use them automatically. No action needed.

### Build failed?
- Check build logs in Vercel dashboard
- Verify `frontend` directory is correct
- Ensure all dependencies are in package.json

---

## Important Notes

✅ **Vercel features on free tier:**
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Auto-scaling
- Preview deployments for PRs

📝 **Your frontend URL format:**
`https://e-store-[random-id].vercel.app`

🔄 **Automatic deployments:**
- Every push to `master` auto-deploys
- Preview URLs for pull requests

---

## Custom Domain (Optional)

Want a custom domain like `estore.yourname.com`?

1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## Next Steps

After successful deployment:
1. ✅ Test all features end-to-end
2. ✅ Set up PayPal sandbox (if needed)
3. ✅ Share live URLs
4. ✅ Update portfolio with live demo link