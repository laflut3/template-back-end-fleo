// User/route/auth.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

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

        // Créer une session pour l'utilisateur
        req.session.userId = user._id;
        req.session.username = user.username;

        res.send('Login successful');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour la déconnexion
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Logout successful');
    });
});

// Route pour vérifier la session
router.get('/session', (req, res) => {
    if (req.session.userId) {
        res.json({
            userId: req.session.userId,
            username: req.session.username
        });
    } else {
        res.status(401).send('Not authenticated');
    }
});

module.exports = router;
