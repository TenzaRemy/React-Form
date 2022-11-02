const express = require('express');
const router = express.Router();
const password = require('../middleware/password-validator');

const userCtrl = require('../controllers/user');

router.post('/signin', password, userCtrl.signin);
router.post('/signup', userCtrl.signup);

module.exports = router;