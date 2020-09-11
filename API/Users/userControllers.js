const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const jwt = require ('jsonwebtoken');
const db = require('../../SQL/SQLRoutes');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(bodyPaser.json());

const adminUsers = [
    {
        UserName: "santi",
        fullName: "Beja ",
        email: "santi@email.com",
        phone: 345678,
        address: "123 fake st",
        admin: true
    },
    {
        UserName: "Pepita",
        fullName: "smith",
        email: "pep@email.com",
        phone: 345678,
        address: "null",
        admin: true
    }
]

// -----------------------
// verify  jwt save on headers 
// check, change that ws name


  app.post('/login', (req, res) => {
    //   created user with The EMAIL as an object 
    const user = {
        // `${result[0].email}`
      Email: 'santi@mail.com' // ejem check delete 
    }
    jwt.sign({user: user}, "secretKey", (err, token) => {
      res.json({
        token, 
      })
    });
  });

// FORMAT OF TOKKEN 
// Verify token on headers 
function verifyToken(req, res, next){
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // split at the space 
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        next(); 
    } else {
        res.status(403).json({
            message: 'you dont have access'
        });
    }
}


app.post('/login', (req, res) => {
    let authEmail = req.body.email;
    let sql = `SELECT * FROM base_resto.users WHERE email = '${authEmail}'`;
    db.query(sql, (err, result) => {
      console.log(result);
      if(result[0].email != authEmail ){
        res.status(401).json({
          message: 'Unauthorized, wrong Email Or password'
        });
      } else {
        bcrypt.compare(`${req.body.password}`, `${result[0].password}`, function(bcryptErr, resultCompare) {
          if(resultCompare !== true){
            res.status(403).json({
              list: bcryptErr,
              message: 'Forbidden, Wrong Email Or password'
            })
          } else {
            // check for JWT
            res.status(200).json({
              message:'you have access now'
                // check add jwt to headers 
                // just admin validtaion 
            });
          }
        });
      }
    });
  });


module.exports = app;
