# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account (use Google/GitHub for quick signup)
3. Complete email verification

## Step 2: Create a Free Cluster

1. After login, click **"Build a Database"**
2. Choose **M0 FREE** tier
3. Select **AWS** as provider
4. Choose a region close to you (e.g., `us-east-1` for USA East Coast)
5. Click **"Create Cluster"** (takes 1-3 minutes)

## Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `estore_admin`
5. Click **"Autogenerate Secure Password"** - **COPY THIS PASSWORD!**
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Whitelist Your IP Address

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development - shows `0.0.0.0/0`)
   - For production, you should restrict this to specific IPs
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **Driver: Node.js** and **Version: 5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://estore_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the password you copied in Step 3
7. Add the database name `estore` before the `?`:
   ```
   mongodb+srv://estore_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/estore?retryWrites=true&w=majority
   ```

## Step 6: Update Local .env File

Update your `E-store/.env` file with the connection string:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://estore_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/estore?retryWrites=true&w=majority
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=sb
FRONTEND_URL=http://localhost:3000
```

## Step 7: Seed the Database

Once connected, run this command to populate your database with sample data:

```bash
cd E-store
npm run data:import
```

You should see:
```
✓ MongoDB Connected: cluster0-xxxxx.mongodb.net
✓ Data Imported!
```

## Troubleshooting

**Error: "MongooseServerSelectionError: Could not connect to any servers"**
- Check if your IP is whitelisted in Network Access
- Verify the connection string is correct
- Make sure you replaced `<password>` with your actual password

**Error: "bad auth: Authentication failed"**
- Double-check your username and password
- Ensure there are no special characters that need URL encoding in the password

**URL Encoding Special Characters:**
If your password contains special characters, encode them:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `[` → `%5B`
- `]` → `%5D`

Example: If password is `P@ssw0rd!`, use `P%40ssw0rd!`