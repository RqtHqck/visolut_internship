require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db')
const User = require('./models/User')
const path = require('path');
// const router = express.Router();  // Routes
const { check, validationResult } = require('express-validator');  // For email validation

const session = require('express-session');  // Session
const flash = require('express-flash');  // Flah messages


const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');  // Templates EJS
app.use(express.static(path.join(__dirname, 'public')));  // Static files in public
app.use(express.urlencoded({extended: false}))
app.use(express.json());  
// Session & flashes
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());


app.get('/', async (req, res) => {
  res.render('index')
})


app.post('/post-user', [
  // email validation (express-validator)
  check('email').isEmail().withMessage('Invalid email'),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', 'Incorrect email. Try again');
    return res.redirect('/');
  }

  const { email } = req.body;

  try {
    // Попытка создать пользователя
    const user = await User.create({ email });
    console.log(user.dataValues)
    req.flash('success', 'Your application has been added');    
  } catch (error) {
    console.error('An error occurred when creating the user :', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      req.flash('error', 'This email is already registered');
    } else {
      req.flash('error', 'Server error occurred');
    } 
  }
  return res.redirect('/');
});


app.post('/api/user/create', [
  check('email').isEmail().withMessage('Invalid email'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await User.create({ email });
    console.log(user.dataValues)
    return res.status(201).json({ message: 'User created', user });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Server error'});
  }
});


app.post('/api/user/check', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      console.log(user.dataValues)
      return res.status(200).json({ exists: true, message: 'User is exists', user });
    } else {
      return res.status(404).json({ exists: false, message: 'User not found' });
    }
  } catch {
    console.error('User verification error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
})
 

app.get('/api/user/all', async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      users.forEach(userModel => console.log(userModel.dataValues))
      return res.status(200).json({users});
    } else {
      return res.status(404).json({ exists: false, message: 'Users not found' });
    }
  } catch {
    console.error('User verification error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
})
 

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})