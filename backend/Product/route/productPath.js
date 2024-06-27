const express = require('express');
const router = express.Router();
const ProductPath = require('../model/ProductPath');
const middleAuth = require('../../User/middleware/middleAuth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Route pour ajouter un produit
router.post('/add', middleAuth.isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.buffer : null;
        const product = new ProductPath({ name, description, price, image });
        await product.save();
        res.status(201).send('ProductPath added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route pour supprimer un produit
router.delete('/delete/:id', middleAuth.isAdmin, async (req, res) => {
    try {
        const product = await ProductPath.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('ProductPath not found');
        }
        res.send('ProductPath deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
