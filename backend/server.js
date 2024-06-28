
/*server.js*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const authRoutes = require('./User/route/auth');
const productRoutes = require('./Product/route/productPath'); // Assurez-vous que le chemin est correct
const middleAuth = require('./User/middleware/middleAuth');
const { estAdmin } = require('./User/middleware/middleAuth'); // Modifier ici
const cartRoutes = require('./User/route/panierPath');
// const contactRoutes = require('./User/route/contact'); // Ajoutez cette ligne

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
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


app.use('/api', productRoutes);
/*app.use('/auth', authRoutes);
app.use('/cart', cartRoutes); // Ajoutez cette ligne
*/

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
