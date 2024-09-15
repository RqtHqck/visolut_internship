require('dotenv').config();
const express = require('express');
const path = require('path');
// Routes
const userRoutes = require('./routes/userRoutes');
const userApiRoutes = require('./routes/userApiRoutes');

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');  // Templates EJS
app.use(express.static(path.join(__dirname, 'public')));  // Static files in public
app.use(express.urlencoded({extended: false}))
app.use(express.json());  
// Session & flashes
app.use(require('express-session')({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: true }));
app.use(require('express-flash')());

// Connecting routes
app.use('/user', userRoutes);
app.use('/api', userApiRoutes);


app.get('/', async (req, res) => {
  res.render('index')
})


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})