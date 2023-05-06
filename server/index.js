const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const expressSession = require ('express-session');
const cookieParser = require ('cookie-parser');
const bcrypt = require ('bcrypt');
const db = require('./db');
const { request } = require('http');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser('keyboard cat')); 

app.use(passport.initialize());   
app.use(passport.session());  
require('./passportConfig')(passport); 

// Middleware end

app.post('/registerAsDriver', (req, res) => {
  
    const query = "INSERT INTO driver_account (`username`, `password`) VALUES (?,?)";
    const query2 = "SELECT * FROM driver_account where username = ?";

    const query3 = "INSERT INTO driver_info (`username`, `name`, `dob`, `gender`, `nId`, `drivingId`, `experience`, `phone`, `date`, `location`, `fare`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
  
    db.query(query2, [req.body.username] ,async (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows.length > 0) {
        res.send("duplicateUsername");
      }
      if (rows.length === 0) {
        const hashedPassword =  await bcrypt.hash(req.body.password, 10);
        db.query(query, [req.body.username, hashedPassword], (err, rows) => {
          if (err) {console.log(err);}
          //res.send("User created");
        });
        db.query(query3, [req.body.username, req.body.name, req.body.dob, req.body.gender, req.body.nId, req.body.drivingId, req.body.experience, req.body.phone, req.body.date, req.body.location, req.body.fare], (err, rows) => {
          if (err) {console.log(err);}
          else{
            res.send("success");
          } 
          
        });

      }
    })
})

app.post('/registerAsOwner', (req, res) => {
  
  const query = "INSERT INTO owner_account (`username`, `password`) VALUES (?,?)";
    const query2 = "SELECT * FROM owner_account where username = ?";

    const query3 = "INSERT INTO owner_info (`username`, `name`, `dob`, `gender`, `nId`, `phone`, `date`, `location`) VALUES (?,?,?,?,?,?,?,?)"
  
    db.query(query2, [req.body.username] ,async (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows.length > 0) {
        res.send("duplicateUsername");
      }
      if (rows.length === 0) {
        const hashedPassword =  await bcrypt.hash(req.body.password, 10);
        db.query(query, [req.body.username, hashedPassword], (err, rows) => {
          if (err) {console.log(err);}
          //res.send("User created");
        });
        db.query(query3, [req.body.username, req.body.name, req.body.dob, req.body.gender, req.body.nId, req.body.phone, req.body.date, req.body.location], (err, rows) => {
          if (err) {console.log(err);}
          else{
            res.send("success");
          } 
          
        });

      }
    })
})


app.post('/login', (req, res) => {
  const query = "SELECT * FROM owner_account where username = ?";
  const query2 = "SELECT * FROM driver_account where username = ?";

  if(req.body.loginType === "owner"){
    
    db.query(query, [req.body.username], async (err, rows) =>{
      console.log("query in owner");
      if(rows.length == 0){
        res.send("notFound");
      }
      else{ //compare pass
        bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            res.send("successOwner");
          } 
          else {
            res.send("notFound");
          }
        })
      }
    })
  }
  else if(req.body.loginType === "driver"){
    db.query(query2, [req.body.username], async (err, rows) =>{
      if(rows.length == 0){
        res.send("notFound");
      }
      else{ //compare pass
        bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            res.send("successDriver");
          } 
          else {
            res.send("notFound");
          }
        })
      }
    })

  }

})

app.get('/getUser', (req, res) => {
res.send(req.user);
})
  
app.listen(3001, ()=>{
    console.log('server started at port 3001');
});