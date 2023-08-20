const express = require('express');
const { getHome } = require('../controllers/home');
const { getSocial } = require('../controllers/social');
const { getRegister, postRegister, getLogin, postLogin, getResetPassword, logout } = require('../controllers/authentication');
const { registerValidator, loginValidator } = require('./validation');
const { isUser, isGuest } = require('./auth-guard');
const { postNote, deleteNote, updateNote } = require('../controllers/note');
const { getBin, deleteBin, deleteAllBin } = require('../controllers/bin');

const router = express.Router();

router.get('/', isUser, getHome);


router.get('/social', isUser, getSocial);


router.post('/note', isUser, postNote);
router.patch('/note/:id', isUser, updateNote);
router.delete('/note/:id', isUser, deleteNote);


router.get('/bin', isUser, getBin);
router.delete('/bin/:id', isUser, deleteBin);
router.delete('/bin', isUser, deleteAllBin);


router.get('/register', isGuest, getRegister);
router.post('/register', isGuest, ...registerValidator, postRegister);
router.get('/login', isGuest, getLogin);
router.post('/login', isGuest, ...loginValidator, postLogin);
router.get('/reset-password', isGuest, getResetPassword);
router.all('/logout', isUser, logout);


router.all('/error', (req , res) => res.render("errors"));
router.all('/404', (req , res) => res.render("404"));
router.use((req , res) => res.redirect("/404"));

module.exports = router;
