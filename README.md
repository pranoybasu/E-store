# ⚡ E-Store - Modern Dark Theme E-Commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application featuring a stunning modern dark theme, custom-built UI components, and seamless shopping experience with PayPal integration.

## 🌐 Live Demo

**Live Application:** https://e-storebackend.up.railway.app/

### 🔑 Test Credentials
- **Regular User:** john@email.com / 123456

## ✨ Key Features

### 🎨 Modern UI/UX
- **Custom Dark Theme** - Sleek, modern dark interface with carefully crafted color palette
- **Zero Bootstrap Dependencies** - 100% custom CSS for complete control and performance
- **Fluid Responsive Design** - Seamless experience across all devices (mobile, tablet, desktop)
- **Smooth Animations** - Polished transitions and hover effects throughout
- **Always-Visible Navigation** - Clean navbar that adapts to screen size with flexbox wrapping

### 🛒 E-Commerce Features
- **25+ Sample Products** - Full catalog with high-quality product images
- **Product Carousel** - Featured products showcase on homepage
- **Advanced Search** - Real-time product search with instant results
- **Smart Pagination** - Browse products efficiently with page navigation
- **Shopping Cart** - Add, update, and remove items with live total calculation
- **Product Reviews** - 5-star rating system with written reviews

### 🔐 User Management
- **JWT Authentication** - Secure login and registration system
- **User Profiles** - Manage personal information and view order history
- **Order Tracking** - Real-time order status updates
- **PayPal Integration** - Secure payment processing (sandbox mode)

### 👨‍💼 Admin Dashboard
- **Product Management** - Create, edit, delete products with image upload
- **User Administration** - View and manage user accounts
- **Order Management** - Process orders and mark as delivered
- **Comprehensive Analytics** - Overview of all store operations

## 🎨 Design System

### Color Palette
- **Background Layers:** 
  - Primary: `#0a0a0a` (Darkest)
  - Secondary: `#1a1a1a` (Dark)
  - Tertiary: `#2a2a2a` (Medium)
- **Accent Colors:**
  - Blue: `#0071e3` (Primary actions)
  - Green: `#30d158` (Success states)
  - Red: `#ff3b30` (Danger/Delete)
  - Yellow: `#ffd60a` (Warnings)
- **Text Hierarchy:**
  - Primary: `#ffffff` (Headings, important text)
  - Secondary: `#b3b3b3` (Body text)
  - Tertiary: `#8a8a8a` (Subtle text)

### Responsive Breakpoints
- **Desktop:** 1200px+
- **Tablet:** 992px - 1199px
- **Small Tablet:** 768px - 991px
- **Mobile:** 480px - 767px
- **Small Mobile:** < 480px

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Redux Toolkit** - Centralized state management
- **Custom CSS** - 1764 lines of hand-crafted styles (no UI framework dependencies)
- **Axios** - HTTP client for API calls
- **React PayPal Button** - Payment integration

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcrypt.js** - Password hashing
- **Multer** - File upload handling

### Deployment
- **Platform:** Railway.app (Backend + Frontend served together)
- **Database:** MongoDB Atlas (M0 Free Tier)
- **CDN:** Railway static file serving
- **Payment:** PayPal Sandbox

## 🚀 Quick Start - Local Development

### Prerequisites
- Node.js v14 or higher
- MongoDB (local instance or Atlas cloud)
- PayPal Developer Account (for payment testing)

### Installation Steps

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
npm install
cd ..
```

4. **Configure environment variables**

Create `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

5. **Seed the database (optional)**
```bash
# Import 25 sample products and users
npm run data:import

# Clear all data
npm run data:destroy
```

6. **Start development servers**
```bash
# Run both frontend and backend concurrently
npm run dev

# Backend only (port 5000)
npm run server

# Frontend only (port 3000)
npm run client
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api

## 📁 Project Structure

```
E-store/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── data/           # Sample data for seeding (25 products)
│   ├── middleware/     # Auth, error handling
│   ├── models/         # Mongoose schemas (User, Product, Order)
│   ├── routes/         # API endpoints
│   ├── utils/          # Helper functions (JWT)
│   └── server.js       # Express server entry point
├── frontend/
│   ├── public/
│   │   └── images/     # Product images (25+ photos)
│   └── src/
│       ├── actions/    # Redux actions
│       ├── components/ # Reusable UI components
│       ├── constants/  # Redux action types
│       ├── reducers/   # Redux state reducers
│       ├── screens/    # Page components (15 screens)
│       ├── index.css   # Custom CSS (1764 lines, dark theme)
│       ├── store.js    # Redux store configuration
│       └── App.js      # Main application component
├── uploads/            # User-uploaded product images
├── .env               # Environment variables (not in git)
└── package.json       # Root dependencies
```

## 🎯 API Endpoints

### Products API
```
GET    /api/products              # Get all products (with pagination)
GET    /api/products/:id          # Get single product details
POST   /api/products              # Create product (Admin only)
PUT    /api/products/:id          # Update product (Admin only)
DELETE /api/products/:id          # Delete product (Admin only)
POST   /api/products/:id/reviews  # Create product review
GET    /api/products/top          # Get top-rated products
```

### Users API
```
POST   /api/users/login           # Authenticate user & get token
POST   /api/users                 # Register new user
GET    /api/users/profile         # Get logged-in user profile
PUT    /api/users/profile         # Update user profile
GET    /api/users                 # Get all users (Admin only)
GET    /api/users/:id             # Get user by ID (Admin only)
PUT    /api/users/:id             # Update user (Admin only)
DELETE /api/users/:id             # Delete user (Admin only)
```

### Orders API
```
POST   /api/orders                # Create new order
GET    /api/orders/myorders       # Get logged-in user orders
GET    /api/orders/:id            # Get order by ID
PUT    /api/orders/:id/pay        # Update order to paid
PUT    /api/orders/:id/deliver    # Mark order as delivered (Admin only)
GET    /api/orders                # Get all orders (Admin only)
```

### Upload API
```
POST   /api/upload                # Upload product image (Admin only)
```

## 🔐 Environment Variables

### Backend Configuration (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/estore
JWT_SECRET=your_super_secret_jwt_key_here
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```

### Frontend Configuration (Railway)
The frontend automatically detects the API URL based on the deployment environment. No additional frontend environment variables are needed when deployed together.

## 🎨 Custom CSS Architecture

The application features a completely custom CSS system with zero Bootstrap dependencies:

### Core Features (1764 lines)
- **CSS Grid System** - Custom 12-column responsive grid
- **Form Components** - Styled inputs, buttons, selects, textareas
- **Table Styles** - Sortable tables with hover effects
- **Navigation** - Custom navbar with flexbox wrapping
- **Cards** - Product cards, order summaries, profile cards
- **Carousel** - Featured products slider with smooth transitions
- **Modals & Alerts** - Custom message and loader components
- **Utilities** - Spacing, text, display, color utility classes

### Why Custom CSS?
✅ **Smaller Bundle Size** - 52KB smaller than Bootstrap version  
✅ **Better Performance** - No unused CSS framework code  
✅ **Complete Control** - Every pixel designed for this application  
✅ **Modern Features** - CSS Grid, Flexbox, Custom Properties  
✅ **Dark Theme Native** - Built with dark mode from the ground up  

## 📱 Responsive Design

The application is fully responsive with carefully crafted breakpoints:

- **Mobile First** - Optimized for small screens, enhanced for larger
- **Flexible Navigation** - Always-visible navbar that wraps on mobile
- **Touch Friendly** - Larger tap targets on mobile devices
- **Adaptive Images** - Responsive product images with proper aspect ratios
- **Fluid Typography** - Text scales appropriately across devices
- **Grid Layouts** - Automatic column adjustment (4 → 3 → 2 → 1)

## 🚀 Deployment Guide

### Railway Deployment (Current Setup)

The application is configured to deploy backend and frontend together on Railway:

1. **Connect GitHub Repository** to Railway
2. **Add Environment Variables** in Railway dashboard
3. **Deploy** - Railway auto-builds and serves both frontend and backend
4. **Custom Domain** (optional) - Configure custom domain in Railway settings

### Build Configuration
```json
{
  "scripts": {
    "build": "npm install && cd frontend && npm install && npm run build",
    "start": "node backend/server.js"
  }
}
```

Railway automatically:
- Installs dependencies
- Builds the React frontend
- Serves frontend build files from backend
- Exposes the application on HTTPS

## 📚 Additional Documentation

- **[MongoDB Atlas Setup](MONGODB-ATLAS-SETUP.md)** - Database configuration guide
- **[PayPal Sandbox Setup](PAYPAL-SANDBOX-SETUP.md)** - Payment integration guide
- **[Railway Deployment](RAILWAY-DEPLOYMENT-STEPS.md)** - Detailed deployment steps
- **[Deployment Guide](DEPLOYMENT-GUIDE.md)** - General deployment overview

## 🏆 Recent Updates

### Bootstrap Removal Migration (November 2024)
- ✅ Removed all Bootstrap dependencies (react-bootstrap, bootstrap CSS)
- ✅ Created 1764 lines of custom CSS with modern dark theme
- ✅ Migrated all 15 screens to custom components
- ✅ Built custom grid system, forms, tables, navigation
- ✅ Reduced bundle size by 52KB (JS) and 19.86KB (CSS)
- ✅ Improved performance and load times
- ✅ Enhanced mobile responsiveness
- ✅ Removed hamburger menu for always-visible navigation

### Product Catalog Enhancement
- ✅ Expanded to 25 sample products with real images
- ✅ Added product carousel for featured items
- ✅ Improved product card design with hover effects
- ✅ Enhanced product detail pages with better layouts

## 🐛 Troubleshooting

### Common Issues

**Issue:** PayPal button not loading  
**Solution:** Verify PAYPAL_CLIENT_ID is set correctly in environment variables

**Issue:** Images not displaying  
**Solution:** Check that product images exist in `/frontend/public/images/` directory

**Issue:** CORS errors  
**Solution:** Ensure backend CORS is configured to allow frontend domain

**Issue:** MongoDB connection fails  
**Solution:** Verify MONGO_URI connection string and database access permissions

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Pranoy Basu**
- GitHub: [@pranoybasu](https://github.com/pranoybasu)
- LinkedIn: [Pranoy Basu](https://linkedin.com/in/pranoybasu)

## 🙏 Acknowledgments

- MongoDB Atlas for reliable cloud database hosting
- Railway.app for seamless deployment platform
- PayPal Developer for sandbox payment testing
- React community for excellent documentation and tools

## 📊 Project Stats

- **Total Lines of Custom CSS:** 1,764
- **React Components:** 30+
- **API Endpoints:** 25+
- **Sample Products:** 25
- **Screens/Pages:** 15
- **Bundle Size (Production):**
  - JavaScript: 92.95 KB (gzipped)
  - CSS: 6.05 KB (gzipped)

---

**Last Updated:** November 3, 2024  
**Status:** ✅ Fully Deployed | 🎨 Modern Dark Theme | 🚀 Custom CSS Architecture  
**Live URL:** https://e-storebackend.up.railway.app/
