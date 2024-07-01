const express = require('express');
const router = express.Router();
const Review = require('../model/review');
const middleAuth = require('../../User/middleware/middleAuth');
const { estAdmin } = require('../../User/middleware/middleAuth');

// Obtenir tous les avis pour un produit
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ajouter un avis
router.post('/', middleAuth, async (req, res) => {
    try {
        const { productId, content } = req.body;
        const newReview = new Review({
            user: req.session.userId,
            product: productId,
            content
        });
        await newReview.save();
        res.status(200).send('Review added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Supprimer un avis
router.delete('/:reviewId', estAdmin, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.status(200).send('Review deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Répondre à un avis
router.patch('/:reviewId', estAdmin, async (req, res) => {
    try {
        const { response } = req.body;
        const review = await Review.findById(req.params.reviewId);
        review.response = response;
        await review.save();
        res.status(200).send('Response added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
