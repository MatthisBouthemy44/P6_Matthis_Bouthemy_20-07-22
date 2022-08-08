const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//Déclaration des routes

//POST
router.post('/', auth, multer, sauceCtrl.createSauce);

//GET
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

//PUT
router.put('/:id', auth, multer, sauceCtrl.modifySauces);

//DELETE
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);


module.exports = router;