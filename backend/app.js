//importer express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//import des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./models/Sauce');

mongoose.connect('mongodb+srv://admin:4QeLEQ5377Q6D4PH@cluster0.r95lq.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Routes
app.use('/api/auth', userRoutes);
module.exports = app;