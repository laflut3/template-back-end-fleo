const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./User/route/auth');
const productRoutes = require('./Product/route/productPath'); // Assurez-vous que le chemin est correct
const middleAuth = require('./User/middleware/middleAuth');
const { estAdmin } = require('./User/middleware/middleAuth');

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

// Configurer les sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14 * 24 * 60 * 60 // = 14 jours. Vous pouvez ajuster selon vos besoins
    })
}));

// Configurer le serveur pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

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

// Route pour la page du profil utilisateur
app.get('/profile', middleAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'User/view/profile.html'));
});

// Route pour la page d'administration
app.get('/admin', estAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'Product/view/adminProduct.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});


//Style -----> css
app.get('/styleBase', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/styles.css'));
});

app.get('/styleConnexion', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/connexion.css'));
});

app.get('/styleAdmin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/admin.css'));
});