const mysql = require('mysql');


var db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Fabiha1999!",
    database: "driver_lagbe"
});

db.getConnection(function(err, connection) {
  if (err) {
    console.log(err);
    return callback(err);
  }
  else{
    console.log("Connected!")
  }
});

module.exports = db;

