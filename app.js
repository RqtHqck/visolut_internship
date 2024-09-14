require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db')
const User = require('./models/User')
const path = require('path');

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');  // Templates EJS
app.use(express.static(path.join(__dirname, 'public')));  // Static files in public
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('index')
}) 

app.post('/taske-info', async (req, res) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let { email } = req.body;
  console.log(email)

  const user = await User.findAll();
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})