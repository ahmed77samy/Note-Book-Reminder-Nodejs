const express = require('express');
const { getHome } = require('../controllers/home');
const { getRegister, postRegister, getLogin, postLogin, getResetPassword, logout } = require('../controllers/authentication');
const { registerValidator, loginValidator } = require('./validation');
const { isUser, isGuest } = require('./auth-guard');

const router = express.Router();

router.get('/', isUser, getHome);

router.get('/register', isGuest, getRegister);

router.post('/register', isGuest, ...registerValidator, postRegister);

router.get('/login', isGuest, getLogin);

router.post('/login', isGuest, ...loginValidator, postLogin);

router.get('/reset-password', isGuest, getResetPassword);

router.all('/logout', isUser, logout);

module.exports = router;
