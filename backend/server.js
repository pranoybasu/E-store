const express = require('express')
const products = require('./data/products')

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

app.listen(5000, console.log('Server running on port 5000'))