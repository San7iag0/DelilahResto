const express = require('express');
const routes = express.routes();

const userCtrl = require('../controllers/userControllers');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

// code for the new Admins user login and sign up