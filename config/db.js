  const mysql = require('mysql2');

  const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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