const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 8080;
const app = express();

app.set('view engine', 'ejs');  // Templates
app.use(express.static(path.join(__dirname, 'public')));  // Static files in public
app.use(express.urlencoded({extended: false}));  // Body-parser for posted data 


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/taske-info', (req, res) => {
  let email = req.params.email 
})


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})