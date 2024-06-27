const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const middleAuth = require('../../User/middleware/middleAuth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Route pour ajouter un produit
router.post('/add', middleAuth.estAdmin, upload.single('image'), async (req, res) => {
    try {
        console.log(req.body); // Log the received data
        console.log(req.file); // Log the uploaded file data

        const { name, description, price } = req.body;
        const image = req.file ? req.file.buffer : null;
        const product = new Product({ name, description, price, image });
        await product.save();
        res.status(201).send('Product added successfully');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send(error.message);
    }
});

// Route pour supprimer un produit
router.delete('/delete/:id', middleAuth.estAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send('Product deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour obtenir tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
