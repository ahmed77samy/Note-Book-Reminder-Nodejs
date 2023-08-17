const express = require('express');
const { getHome } = require('./controllers/home');
const { getLogin } = require('./controllers/login');
const { getResetPassword } = require('./controllers/reset-password');
const { getRegister } = require('./controllers/register');

const router = express.Router();

router.get('/', getHome);

router.get('/login', getLogin);

router.get('/reset-password', getResetPassword);

router.get('/register', getRegister);

module.exports = router;
