const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const app = express(); 
app.use(bodyParser.json()); 
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce') 
.then(() => console.log('MongoDB connected')) 
.catch(err => console.log(err)); 
const variantSchema = new mongoose.Schema({ 
color: String, 
size: String, 
stock: Number 
}); 
const productSchema = new mongoose.Schema({ 
name: String, 
 
 
    price: Number, 
    category: String, 
    variants: [variantSchema] 
}); 
 
const Product = mongoose.model('Product', productSchema); 
 
app.post('/products', async (req, res) => { 
    try { 
        const product = new Product(req.body); 
        await product.save(); 
        res.send(product); 
    } catch (err) { 
        res.status(400).send(err); 
    } 
}); 
 
app.get('/products', async (req, res) => { 
    try { 
        const products = await Product.find(); 
        res.send(products); 
    } catch (err) { 
        res.status(500).send(err); 
    } 
}); 
 
app.get('/products/category/:category', async (req, res) => { 
    try { 
        const products = await Product.find({ category: req.params.category }); 
        res.send(products); 
    } catch (err) { 
        res.status(500).send(err); 
    } 
}); 
 
app.get('/products/by-color/:color', async (req, res) => { 
    try { 
        const products = await Product.find({ 'variants.color': req.params.color }); 
        res.send(products); 
    } catch (err) { 
        res.status(500).send(err); 
    } 
}); 
app.listen(3000, () => console.log('Server running on port 3000'));