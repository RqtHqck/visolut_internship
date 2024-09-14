require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db')
const User = require('./models/User')
const path = require('path');
// For email validation
const { check, validationResult } = require('express-validator');
// Flah messages
const session = require('express-session');
const flash = require('express-flash');


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

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/user/create', [
  // email validation (express-validator)
  check('email').isEmail().withMessage('Invalid email'),
], async (req, res) => {

  console.log('Request body:', req.body); 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', 'Incorrect email. Try again');
    return res.redirect('/');
  }

  const { email } = req.body;

  try {
    // Попытка создать пользователя
    const user = await User.create({ email });
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


// app.post('/user/check', async (req, res) => {

// })
 

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})