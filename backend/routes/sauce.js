const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//SAUCE

//Déclaration des routes

//POST
router.post('/', auth, multer, sauceCtrl.createSauce);

//GET
router.get('/', auth, sauceCtrl.getAllSauces);


module.exports = router;