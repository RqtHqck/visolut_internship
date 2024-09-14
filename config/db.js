  const mysql = require('mysql2');

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'N9F$GWcv',
    database: 'onlyjobs',  
  });


  conn.connect = ((err) => {
    if (err) {
      console.error('Error when open database: \n' + err.message);
      return;
    }
    console.log("Database ----- opened");
  });


  conn.end = ((err) => {DB_HOST=localhost
    if (err) {
      return console.log("Error with database: \n" + err.message);
    }
    console.log("Database ----- closed");
  });


  module.exports = conn;