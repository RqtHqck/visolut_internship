// routes/userApiRoutes.js
const express = require('express');
const axios = require('axios');
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
const isEmailValid = require('../utils/emailValidator') // Validator email 
const router = express.Router();


router.post('/user/create', [
  check('email').isEmail().withMessage('Invalid email'),
], async (req, res) => {
  // API for create user

  const errors = validationResult(req);  // Collect errors while checking email 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body; // Collect email from request
  const valid = await isEmailValid(email);

  if (valid) {
    try {
      const userExists = await User.findOne({ where: { email } });  // Try find user in db if exists

      if (userExists) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const user = await User.create({ email }); // Creat user and pull into db
      console.log(user.dataValues);
      return res.status(201).json({ message: 'User created', user });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(400).json({ error: 'Email is not valid' });
  }
});


router.get('/user/check', [
  check('email').isEmail().withMessage('Invalid email')
], async (req, res) => {
  // API for check if user is exists

  const errors = validationResult(req); // Collect errors while checking email 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.query;  // Collect email from request

  try {
    const user = await User.findOne({ where: { email } });  // Try to find user
    if (user) {
      console.log(user.dataValues);
      return res.status(200).json({ exists: true, message: 'User exists', user });
    } else {
      console.log( { message: 'user not exists' } )
      return res.status(404).json({ exists: false, message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});
 

router.get('/user/all', async (req, res) => {
  // API shows all users
  try {
    const users = await User.findAll(); // All users
    if (users) {
      users.forEach(userModel => console.log(userModel.dataValues)) // Shows only dataValues of User model
      return res.status(200).json({users});
    } else {
      return res.status(404).json({ exists: false, message: 'Users not found' });
    }
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
})


module.exports = router;
