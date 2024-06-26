// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('/backend/User/model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

// Route pour l'inscription
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
