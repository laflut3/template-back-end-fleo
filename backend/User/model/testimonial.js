const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const testimonialSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
    replies: [replySchema]
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
