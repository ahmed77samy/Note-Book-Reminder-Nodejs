const express = require('express');
const { getHome } = require('../controllers/home');
const { getRegister, postRegister, getLogin, postLogin, getResetPassword, logout } = require('../controllers/authentication');
const { registerValidator, loginValidator } = require('./validation');

const router = express.Router();

router.get('/', getHome);

router.get('/register', getRegister);

router.post('/register', ...registerValidator, postRegister);

router.get('/login', getLogin);

router.post('/login', ...loginValidator, postLogin);

router.get('/reset-password', getResetPassword);

router.all('/logout', logout);

module.exports = router;
