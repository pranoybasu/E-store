# Quick PayPal Setup Instructions

## What You Need To Do:

1. **Go to**: https://developer.paypal.com/
2. **Log in** (or create a PayPal account if you don't have one)
3. Click **Dashboard** → **Apps & Credentials**
4. Make sure you're on the **Sandbox** tab
5. Click **Create App**
6. Enter app name: `E-Store Sandbox`
7. Select any sandbox business account
8. Click **Create App**
9. **Copy the Client ID** (long string starting with 'A')

## Update Your .env File:

Replace the current `PAYPAL_CLIENT_ID=sb` line with:

```
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

For example:
```
PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
```

## Restart Backend Server:

After updating .env, restart the backend server (Ctrl+C then `npm run server`)

## Testing:

- The PayPal button should now appear on the order screen
- Use sandbox credentials to complete test payments
- No real money will be charged in sandbox mode

---

**Need detailed instructions?** See [`PAYPAL-SANDBOX-SETUP.md`](PAYPAL-SANDBOX-SETUP.md:1) for complete step-by-step guide.