// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./User/route/auth');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

app.use('/auth', authRoutes);

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

// Route pour la page de connexion
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'User/view/login.html'));
});

// Route pour la page de création de compte
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'User/view/register.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
