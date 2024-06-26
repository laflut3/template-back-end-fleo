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

// Configurer le serveur pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'frontend')));

// Route pour la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
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

//Style -----> css
app.get('/styleBase', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/styles.css'));
});

app.get('/styleConnexion', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/connexion.css'));
});
