// routes/userRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
const isEmailValid = require('../utils/emailValidator') // Validator email 
const router = express.Router();

router.post('/post-user', [
  // email validation (express-validator)
  check('email').isEmail().withMessage('Invalid email'),
], async (req, res) => {

  const errors = validationResult(req); // Collect errors while checking email 
  if (!errors.isEmpty()) {
    req.flash('error', 'Incorrect email. Try again'); // Flash the message into html
    return res.redirect('/');
  }

  const { email } = req.body;
  const valid = await isEmailValid(email);
  
  if (valid) {
    try {
      // Try to create user by email
      const user = await User.create({ email });
      console.log(user.dataValues)
      req.flash('success', 'Your application has been added'); // Flash the message into html 
    } catch (error) {
      console.error('An error occurred when creating the user :', error);
  
      if (error.name === 'SequelizeUniqueConstraintError') {
        req.flash('error', 'This email is already registered');
      } else {
        req.flash('error', 'Server error occurred');
      } 
    }
  } else {
    req.flash('error', 'Email is not valid'); // Flash the message into html
  }

  
  return res.redirect('/');
});

module.exports = router;