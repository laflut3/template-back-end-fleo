const express = require('express');
const router = express.Router();
const Cart = require('../model/panier');
const Product = require('../../Product/model/product');
const middleAuth = require('../middleware/middleAuth');

// Route pour obtenir le panier de l'utilisateur
router.get('/item', middleAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.userId }).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour ajouter un produit au panier
router.post('/add', middleAuth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.userId;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).send('Product added to cart');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour retirer un produit du panier
router.post('/remove', middleAuth, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.session.userId;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(400).send('Cart not found');
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).send('Product removed from cart');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
