# E-Store 🛒

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with features like user authentication, product management, shopping cart, order processing, and PayPal payment integration.

## 🌐 Live Demo

> **⚠️ Configuration in Progress:** Frontend deployment requires environment variable setup to connect to backend.

- **Backend API:** https://e-storebackend.up.railway.app/
- **Frontend:** *Configuration pending - see deployment instructions below*

### Test Credentials
- **Regular User:** john@email.com / 123456
- **Admin User:** admin@email.com / 123456

## ✨ Features

- 🔐 User authentication with JWT
- 📦 Product catalog with search and filtering
- 🛒 Shopping cart functionality
- 💳 PayPal payment integration (sandbox)
- 📊 Admin dashboard for managing products, users, and orders
- ⭐ Product review and rating system
- 📱 Responsive design (mobile-friendly)
- 🔄 Order tracking and management

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Redux (State Management)
- React Bootstrap
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js

### Deployment
- **Frontend:** Vercel
- **Backend:** Railway.app
- **Database:** MongoDB Atlas (M0 Free Tier)

## 📚 Deployment Documentation

Comprehensive deployment guides are available:

- **[🚀 Live URLs & Status](DEPLOYMENT-LIVE-URLS.md)** - Current deployment status and URLs
- **[🔧 Railway Backend Deployment](RAILWAY-DEPLOYMENT-STEPS.md)** - Step-by-step backend deployment
- **[⚡ Vercel Frontend Deployment](VERCEL-DEPLOYMENT-STEPS.md)** - Frontend deployment with troubleshooting
- **[🗄️ MongoDB Atlas Setup](MONGODB-ATLAS-SETUP.md)** - Database configuration
- **[💰 PayPal Sandbox Setup](PAYPAL-SANDBOX-SETUP.md)** - Payment integration guide
- **[📖 General Deployment Guide](DEPLOYMENT-GUIDE.md)** - Complete deployment overview

## 🚀 Quick Start - Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- PayPal Developer Account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/pranoybasu/E-store.git
cd E-store
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install --legacy-peer-deps
cd ..
```

4. **Configure environment variables**

Create `.env` file in root directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

5. **Seed database (optional)**
```bash
# Import sample data
npm run data:import

# Delete data
npm run data:destroy
```

6. **Run the application**

```bash
# Run frontend and backend concurrently
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
E-store/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── data/          # Sample data for seeding
│   ├── middleware/    # Custom middleware (auth, error handling)
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── server.js      # Express server entry point
├── frontend/
│   ├── public/        # Static files
│   └── src/
│       ├── actions/   # Redux actions
│       ├── components/ # React components
│       ├── constants/ # Redux constants
│       ├── reducers/  # Redux reducers
│       ├── screens/   # Page components
│       └── store.js   # Redux store configuration
└── uploads/           # Product image uploads
```

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/estore
JWT_SECRET=your_secret_key_here
PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Frontend (Vercel Environment Variables)
```env
REACT_APP_API_URL=https://e-storebackend.up.railway.app
```

## 🎯 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Create product review

### Users
- `POST /api/users/login` - Authenticate user
- `POST /api/users` - Register user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `PUT /api/users/:id` - Update user (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders` - Get all orders (Admin)

## 🐛 Known Issues & Solutions

### Peer Dependency Warnings
The project uses React 18 with `react-paypal-button-v2` which requires React 17. This is handled via:
- `.npmrc` file with `legacy-peer-deps=true`
- `vercel.json` with custom install command

See [`VERCEL-DEPLOYMENT-STEPS.md`](VERCEL-DEPLOYMENT-STEPS.md#troubleshooting) for details.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Pranoy Basu**
- GitHub: [@pranoybasu](https://github.com/pranoybasu)

## 🙏 Acknowledgments

- Brad Traversy's MERN E-Commerce course for inspiration
- MongoDB Atlas for free database hosting
- Railway.app for free backend hosting
- Vercel for free frontend hosting

---

**Last Updated:** October 31, 2024  
**Status:** Backend deployed ✅ | Frontend deployment in progress ⏳