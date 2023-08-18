const check = require('express-validator').check;

const validation = {};

validation.registerValidator = [
  check('name').not().isEmpty().withMessage('Name Is Required'),
  check('email').not().isEmpty().withMessage('Email is Required').isEmail().withMessage('Email is not correct'),
  check('password').isLength({ min: 6 }).withMessage('Password Is Too Short'),
  check('confirmPassword').custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw 'Confirm Password Is Must Be Match Password';
  }),
];

validation.loginValidator = [
  check('email').not().isEmpty().withMessage('Email is Required').isEmail().withMessage('Email is not correct'),
  check('password').not().isEmpty().withMessage('Password is Required'),
];

module.exports = validation;
