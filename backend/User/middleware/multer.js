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
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Autres routes (login, logout, user-info) restent inchangées

module.exports = router;
