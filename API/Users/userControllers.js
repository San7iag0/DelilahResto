const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const jwt = require ('jsonwebtoken');
const db = require('../../SQL/SQLRoutes');
const bcrypt = require('bcrypt');

app.use(bodyPaser.json());


// FORMAT OF TOKKEN 
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
            const user = result[0].email
            jwt.sign({user: user}, "secretKey", (jwterr, token) => {
            res.json({
              token, 
            });
            console.log(token)
            res.cookie('token', token)
          });
          }
        });
      }
    });
  });


module.exports = app;
