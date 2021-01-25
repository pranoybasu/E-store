import express from'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

//run server
const app = express()
//message to get the api running
app.get('/', (req, res) => {
    res.send('API is running......')

} )
//route to /api/products to access default products
app.get('/api/products', (req, res) => {
    res.json(products)
    
} )
//route to particular selected product
app.get('/api/products/:id', (req, res) => {
 
    const product = products.find((p) =>  p._id === req.params.id)    
        res.json(product)
     
        
        })

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))