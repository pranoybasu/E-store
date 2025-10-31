# PayPal Sandbox Setup Guide

This guide will help you set up a PayPal Sandbox account for testing payments in the E-Store application.

## Step 1: Create PayPal Developer Account

1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Click **Log In** in the top right corner
3. If you don't have a PayPal account:
   - Click **Sign Up**
   - Create a personal or business PayPal account
4. If you have a PayPal account, log in with your credentials

## Step 2: Access Sandbox Accounts

1. After logging in, you'll be redirected to the Developer Dashboard
2. Click on **Dashboard** in the top navigation
3. In the left sidebar, click on **Testing Tools** → **Sandbox Accounts**
4. You'll see two default sandbox accounts:
   - **Personal (Buyer)**: For testing purchases
   - **Business (Seller)**: For receiving payments

### View Sandbox Account Credentials

1. Click the **"..."** (three dots) next to any sandbox account
2. Select **View/Edit Account**
3. Click on the **Account Credentials** tab
4. Note down the email and password for testing

**Default Test Credentials Format:**
- Email: `sb-xxxxx@personal.example.com` (for buyer)
- Email: `sb-xxxxx@business.example.com` (for seller)
- Password: (shown in the credentials tab)

## Step 3: Create REST API App

1. In the left sidebar, click on **Apps & Credentials**
2. Make sure you're on the **Sandbox** tab (not Live)
3. Click **Create App** button
4. Fill in the app details:
   - **App Name**: Enter a name (e.g., "E-Store Sandbox")
   - **App Type**: Select **Merchant**
   - **Sandbox Business Account**: Select one of your sandbox business accounts
5. Click **Create App**

## Step 4: Get Your Client ID

1. After creating the app, you'll be redirected to the app details page
2. You'll see two important credentials:
   - **Client ID**: A long string starting with `A...`
   - **Secret**: A long string (keep this secure, but you only need Client ID for frontend)
3. **Copy the Client ID** - this is what you need for your application

### Example Client ID Format:
```
AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
```

## Step 5: Update Environment Variables

1. Open the `.env` file in the E-Store backend directory
2. Update the `PAYPAL_CLIENT_ID` with your Client ID:

```env
PAYPAL_CLIENT_ID=YOUR_SANDBOX_CLIENT_ID_HERE
```

3. **Save the file**
4. **Restart your backend server** for changes to take effect

## Step 6: Testing Payments

### Using Default Sandbox Accounts:

1. **Start your application** (both backend and frontend)
2. **Add items to cart** and proceed to checkout
3. **Select PayPal** as payment method
4. On the PayPal payment screen:
   - **Email**: Use your sandbox **personal/buyer** account email
   - **Password**: Use the password from Step 2
5. Complete the payment
6. The payment will be processed in sandbox mode (no real money)

### Test Card Details (for PayPal Checkout):

PayPal Sandbox also accepts test credit cards:

**Visa:**
- Card Number: `4032039738549145`
- Expiry: Any future date (e.g., `12/2028`)
- CVV: Any 3 digits (e.g., `123`)

**Mastercard:**
- Card Number: `5425233430109903`
- Expiry: Any future date
- CVV: Any 3 digits

## Step 7: Verify Payments

1. Log in to [PayPal Sandbox](https://www.sandbox.paypal.com/)
2. Use your **business/seller** account credentials
3. Check the **Activity** tab to see received payments
4. You can also log in with the buyer account to see the payment from their side

## Important Notes

### Security Best Practices:

- ✅ **Never commit your Client ID to public repositories** if using production keys
- ✅ Use environment variables (`.env` file)
- ✅ Add `.env` to `.gitignore`
- ✅ For production, switch to **Live** credentials (not Sandbox)

### Switching to Production:

When ready to go live:

1. In PayPal Developer Portal, click **Apps & Credentials**
2. Switch from **Sandbox** tab to **Live** tab
3. Create a new app for production
4. Get your **Live Client ID**
5. Update your production environment variables
6. Test thoroughly before launching!

### Common Issues:

**Problem**: "PayPal script failed to load"
- **Solution**: Check your Client ID is correct
- **Solution**: Ensure backend is running and `/api/config/paypal` endpoint works

**Problem**: "Invalid credentials" during payment
- **Solution**: Make sure you're using sandbox account credentials
- **Solution**: Check the credentials in Developer Portal → Sandbox Accounts

**Problem**: Payment button doesn't appear
- **Solution**: Check browser console for errors
- **Solution**: Verify PayPal script is loaded (check Network tab)

## Additional Resources

- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal REST API Reference](https://developer.paypal.com/api/rest/)
- [Sandbox Testing Guide](https://developer.paypal.com/api/rest/sandbox/)

## Support

If you encounter issues:
1. Check the PayPal Developer Community forums
2. Review the error messages in browser console
3. Verify all environment variables are set correctly
4. Ensure backend server is running and accessible