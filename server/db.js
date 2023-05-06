const mysql = require('mysql');


const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "tuba",
    database: "signupSignin"
});
  
module.exports = db;