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

app.get('/', (req, res) => {
  res.send("hello world")
})


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

    const query3 = "INSERT INTO driver_info (`username`, `name`, `dob`, `gender`, `nId`, `drivingId`, `experience`, `phone`, `date`, `address`, `fare`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
  
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
        db.query(query3, [req.body.username, req.body.name, req.body.dob, req.body.gender, req.body.nId, req.body.drivingId, req.body.experience, req.body.phone, req.body.date, req.body.location, req.body.fare, false], (err, rows) => {
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

    const query3 = "INSERT INTO owner_info (`username`, `name`, `dob`, `gender`, `nId`, `phone`, `date`, `address`) VALUES (?,?,?,?,?,?,?,?)"
  
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


///////////////////////////

app.post('/getActiveDrivers', (req, res) => {
  const query = "SELECT * FROM driver_info where status = ?";

    db.query(query, [true], async (err, rows) =>{
      
      if(rows.length === 0){
        res.send("no user with location");
      }
      else{ //compare pass
        res.send(rows)
      }
    })
})


app.post('/getDriverProfile', (req, res) => {
  const query = "SELECT * FROM driver_info where username = ?";
    db.query(query, [req.body.username], async (err, rows) =>{
      if(err)
      {
        res.send("no driver profile");
      }
      else{ //compare pass
        console.log(rows[0].username, rows[0].name);
        res.send(rows)
      }
    })
})


app.post('/getAllDrivers', (req, res) => {
  const query = "SELECT * FROM driver_info";
    db.query(query, [], async (err, rows) =>{
      if(err)
      {
        res.send("no driver");
      }
      else{ //compare pass
        res.send(rows)
      }
    })
})


app.post('/updateStatus', (req, res) => {
  const { username, latitude, longitude, status } = req.body;
  const query = 'UPDATE driver_info SET latitude = ?, longitude = ?, status = ? WHERE username = ?';
  const params = [latitude, longitude, status, username];

  db.query(query, params, (error, result) => {
    if (error) {
      console.error('Error updating location:', error);
      res.status(500).json({ error: 'Failed to update status' });
      res.send("Failed to update status");
      return
    }

    else{
      console.log('Status updated successfully!');
      // res.status(200).json({ message: 'Status updated successfully' });
      res.send("Status updated successfully")
    }
  });
});


app.post('/updateDriverProfile', (req, res) => {
  const {username, experience, phone, location, fare } = req.body;
  const query = 'UPDATE driver_info SET experience = ?, phone = ?, location = ?, fare = ?  WHERE username = ?';
  const params = [experience, phone, location, fare, username];

  db.query(query, params, (error, result) => {
    if (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
      res.send("Failed to update profile");
      return
    }

    else{
      console.log('Profile updated successfully!');
      // res.status(200).json({ message: 'Status updated successfully' });
      res.send("Profile updated successfully")
    }
  });
});


app.post('/updateOwnerProfile', (req, res) => {
  const {username, phone, location} = req.body;
  const query = 'UPDATE owner_info SET  phone = ?, location = ? WHERE username = ?';
  const params = [phone, location, username];

  db.query(query, params, (error, result) => {
    if (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
      res.send("Failed to update profile");
    }

    else{
      console.log('Profile updated successfully!');
      // res.status(200).json({ message: 'Status updated successfully' });
      res.send("Profile updated successfully")
    }
  });
});


// app.post('/updateDriverProfile', (req, res) => {
//   const {username, experience, phone, location, fare } = req.body;
//   const query = 'UPDATE driver_info SET experience = ?, phone = ?, address = ?, fare = ?  WHERE username = ?';
//   const params = [experience, phone, location, fare, username];

//   db.query(query, params, (error, result) => {
//     if (error) {
//       console.error('Error updating profile:', error);
//       res.status(500).json({ error: 'Failed to update profile' });
//       res.send("Failed to update profile");
//       return
//     }

//     else{
//       console.log('Profile updated successfully!');
//       // res.status(200).json({ message: 'Status updated successfully' });
//       res.send("Profile updated successfully")
//     }
//   });
// });


// app.post('/updateOwnerProfile', (req, res) => {
//   const {username, phone, location} = req.body;
//   const query = 'UPDATE owner_info SET  phone = ?, address = ? WHERE username = ?';
//   const params = [phone, location, username];

//   db.query(query, params, (error, result) => {
//     if (error) {
//       console.error('Error updating profile:', error);
//       res.status(500).json({ error: 'Failed to update profile' });
//       res.send("Failed to update profile");
//     }

//     else{
//       console.log('Profile updated successfully!');
//       // res.status(200).json({ message: 'Status updated successfully' });
//       res.send("Profile updated successfully")
//     }
//   });
// });


//////////////////////////////
app.post('/driverProfile', (req, res) => {
  
  //const query = "INSERT INTO owner_account (`username`, `password`) VALUES (?,?)";
    const query = "SELECT * FROM driver_info where username = ?";

    db.query(query, [req.body.username] ,async (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows.length > 0) {
        res.send(rows[0]);
      }
      else{
        console.log("not found");
      }
      
    })
})

app.post('/sendRequest', (req, res) => {
  
  const query = "INSERT INTO request (driver, owner, source, destination, typeOfTrip, time, status, pickUpTime) VALUES (?,?,?,?,?,?,?,?)";

    db.query(query, [req.body.driverUsername, req.body.ownerUsername, req.body.source, req.body.destination, req.body.typeOfTrip, req.body.time, req.body.status, req.body.pickUpTime] ,async (err, rows) => {
      if (err) {
        console.log(err);
        res.send("error");
      }
      else{
        res.send("success");
      }
      
    })
})

app.post('/sentRequest', (req, res) => {

  const query = "SELECT * FROM request where owner = ?";

    db.query(query, [req.body.ownerUsername] ,async (err, rows) => {
      if (err) {
        console.log(err);
        res.send("error");
      }
      else{
        res.send(rows);
      }
      
    })
})

app.post('/receivedRequest', (req, res) => {

  const query = "SELECT * FROM request where driver = ?";

    db.query(query, [req.body.driverUsername] ,async (err, rows) => {
      if (err) {
        console.log(err);
        res.send("error");
      }
      else{
        res.send(rows);
      }
      
    })
})

app.post('/requestConf', (req, res) => {

  const query = "UPDATE request SET status = ? WHERE id = ?";

    db.query(query, [req.body.status, req.body.id] ,async (err, rows) => {
      if (err) {
        console.log(err);
        res.send("error");
      }
      else{
        res.send("success");
      }
      
    })
})

app.post('/rating', (req, res) => {
  const query = "UPDATE request SET rating = ? WHERE id = ?";
  
  const query2 = "SELECT * FROM driver_info where username = ?";
  const query3 = "UPDATE driver_info SET rating = ?, totalRating = ? WHERE username = ?";


    db.query(query, [req.body.rating, req.body.id] ,async (err, rows) => {
      if (err) {
        console.log(err);
      }
      else{
        console.log("success");
      }
      
    })

    db.query(query2, [req.body.username] ,async (err, rows) => {
      let rating = parseFloat(req.body.rating);
      let totalRating = 1;
      if (err) {
        console.log(err);
      }
      else if(rows[0].rating === null){
        console.log("Null ",rating);
      }
      else if(rows[0].rating !== null){
        rating = (parseFloat(rows[0].rating) * parseFloat(rows[0].totalRating) + parseFloat(req.body.rating)) / (parseFloat(rows[0].totalRating) +1);
        totalRating = (parseFloat(rows[0].totalRating) +1);
        console.log("not Null ", rating);

      }

      db.query(query3, [rating, totalRating, req.body.username] ,async (err, rows) => {
        if (err) {
          console.log(err);
        }
        else{
          console.log("success");
        }
        
      })


      
    })


})






app.get('/getUser', (req, res) => {
res.send(req.user);
})

  
app.listen(3001, ()=>{
    console.log('server started at port 3001');
});