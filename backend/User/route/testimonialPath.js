const express = require('express');
const router = express.Router();
const Testimonial = require('../model/testimonial');
const middleAuth = require('../middleware/middleAuth');
const { estAdmin } = require('../middleware/middleAuth');

// Route pour obtenir tous les témoignages
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour ajouter un nouveau témoignage
router.post('/', middleAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.userId;

        const newTestimonial = new Testimonial({
            title,
            content,
            user: userId,
        });

        await newTestimonial.save();
        res.status(201).send('Testimonial added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour supprimer un témoignage (admin uniquement)
router.delete('/:id', estAdmin, async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(200).send('Testimonial deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour répondre à un témoignage (admin uniquement)
router.post('/:id/reply', estAdmin, async (req, res) => {
    try {
        const { reply } = req.body;
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).send('Testimonial not found');
        }

        testimonial.replies.push({ content: reply, user: req.session.userId });
        await testimonial.save();

        res.status(200).send('Reply added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
