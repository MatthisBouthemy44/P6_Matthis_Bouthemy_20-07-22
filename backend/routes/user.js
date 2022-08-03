const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//POST
router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);
router.post('/sauces', auth, multer, userCtrl.sauces);

module.exports = router;