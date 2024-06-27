const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Stockage en mémoire pour l'image

// Route pour l'inscription
router.post('/register', upload.single('profileImage'), async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        const profileImage = req.file ? req.file.buffer : null;
        const user = new User({ username, email, password, firstName, lastName, profileImage });
        await user.save();
        res.status(201).redirect('/login');
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

        res.redirect('/');
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

// Route pour obtenir les informations de l'utilisateur connecté
router.get('/user-info', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Not authenticated');
    }

    try {
        const user = await User.findById(req.session.userId).select('username email firstName lastName profileImage');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour mettre à jour la photo de profil
router.post('/update-profile-image', upload.single('profileImage'), async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Not authenticated');
    }

    try {
        const profileImage = req.file ? req.file.buffer : null;
        const user = await User.findByIdAndUpdate(req.session.userId, { profileImage }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user); // Renvoie l'utilisateur mis à jour
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
