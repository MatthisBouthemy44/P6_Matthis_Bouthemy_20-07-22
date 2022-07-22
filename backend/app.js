// REQUIRE
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');


// Appel méthode express
const app = express();

//Connexion MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.r95lq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware 
app.use(express.json());

 //app.use(bodyParser.json());  // =>  //app.use(express.json());

 //CORS solution
app.use((req, res, next) => {
    //res.setHeader ('Access-Control-Allow-Origin', process.env.AUTHORIZE_ORIGIN);
    //res.setHeader ('Access-Control-Allow-Credentials',true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.post('/api/auth/signup', (req, res, next) => {
    const newUser = new User({
      ...req.body //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
    });
    newUser.save()
      .then(() => res.status(201).json({message: 'Nouvel utilisateur enregistré !'}))
      .catch(error => res.status(400).json({error}));
  });

//Exports App
 module.exports = app;

