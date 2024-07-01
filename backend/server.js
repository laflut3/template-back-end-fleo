const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const authRoutes = require('./User/route/auth');
const productRoutes = require('./Product/route/productPath');
const middleAuth = require('./User/middleware/middleAuth');
const { estAdmin } = require('./User/middleware/middleAuth');
const cartRoutes = require('./User/route/panierPath');
const contactRoutes = require('./User/route/contact');
const testimonialRoutes = require('./User/route/testimonialPath'); // Assurez-vous que le chemin est correct

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

// Configurer Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL
});
redisClient.connect().catch(console.error);

// Configurer les sessions avec Redis
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/contact', contactRoutes);
app.use('/testimonials', testimonialRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'User/view/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'User/view/register.html'));
});

app.get('/profile', middleAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'User/view/profile.html'));
});

app.get('/admin', estAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'Product/view/adminProduct.html'));
});

app.get('/admin', estAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'Product/view/adminProduct.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/contact.html'));

});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/about.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});



app.get('/styleBase', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/styles.css'));
});

app.get('/styleConnexion', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/connexion.css'));
});

app.get('/styleAdmin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/admin.css'));
});
