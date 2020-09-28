const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const jwt = require ('jsonwebtoken');
const db = require('../../SQL/SQLRoutes');
const bcrypt = require('bcrypt');
const secretKey = '$2y$12$kreEn1FLtAs9wf8iHudSyefxra4.NyK8NXEd7gKoxE6BxDXDDiuii';
// export module verifyToken;

app.use(bodyPaser.json());

app.post('/login', (req, res) => {
    let authEmail = req.body.email;
    let sql = `SELECT * FROM base_resto.users WHERE email = '${authEmail}'`;
    console.log(authEmail)
    db.query(sql, (dberr, result) => {
      if(result[0].email != authEmail){
        res.status(401).json({
          // wrong Email
          message: 'Unauthorized, wrong Email Or password'
        });
      } else {
        bcrypt.compare( `${ req.body.password }`, `${ result[0].password }`, function( bcryptErr, resultCompare ) {
          if(resultCompare !== true){
            res.status(403).json({
              list: bcryptErr,
              // wrong password
              message: 'Forbidden, Wrong Email Or password'
            })
          } else {
            const user = {
              user: result[0].userName,
              email: result[0].email,
              admin: result[0].admin
            }
            jwt.sign({ user }, secretKey, (jwtErr, token) => {
              res.json({
                message: 'you have access now',
                list: token
              })
            })
          }
        });
      }
    });
  });


module.exports = app;
