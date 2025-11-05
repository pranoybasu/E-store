import path from 'path'
import express from'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import cron from 'node-cron'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import Order from './models/orderModel.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

connectDB()

// Cron job to delete unpaid orders older than 30 days (PayPal/Credit Card only)
// Runs daily at 2:00 AM
cron.schedule('0 2 * * *', async () => {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const result = await Order.deleteMany({
      isPaid: false,
      createdAt: { $lt: thirtyDaysAgo },
      paymentMethod: { $ne: 'Cash on Delivery' }
    })

    console.log(`[CRON] Deleted ${result.deletedCount} unpaid orders older than 30 days`.yellow)
  } catch (error) {
    console.error(`[CRON] Error deleting old unpaid orders: ${error.message}`.red)
  }
})

//run server
const app = express()

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

   
  app.use('/api/products', productRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/upload', uploadRoutes)

   
  app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
  )

const __dirname = path.resolve()

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Serve frontend static images from public folder
app.use('/images', express.static(path.join(__dirname, '/frontend/public/images')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

   
  app.use(notFound)
  app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.blue.bold))