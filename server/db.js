const mysql = require('mysql');


var db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "tuba",
    database: "signupSignin"
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

