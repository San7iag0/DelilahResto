const express = require('express');
const routes = express.routes();

const userCtrl = require('../controllers/userControllers');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;