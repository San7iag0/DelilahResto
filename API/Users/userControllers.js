const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const jwt = require ('jsonwebtoken');
const db = require('../../SQL/SQLRoutes');
const bcrypt = require('bcrypt');

app.use(bodyPaser.json());

const secretKey = '$2y$12$kreEn1FLtAs9wf8iHudSyefxra4.NyK8NXEd7gKoxE6BxDXDDiuii';


// FORMAT OF TOKKEN 
// function verifyToken(req, res, next){
//     // get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined'){
//         // split at the space 
//         const bearer = bearerHeader.split(' ');
//         // get token from array
//         const bearerToken = bearer[1];
//         // set the token
//         req.token = bearerToken;
//         next(); 
//     } else {
//         res.status(403).json({
//             message: 'you dont have access'
//         });
//     }
// }

// use the verify function jwt to confirm the token from the user
function verifyToken ( req, res, next ) {
  try{
    const token = req.headers.Authorization.split(' ')[1];
    const decode = jwt.verify( token, 'secretKey' );
    return (decode)? console.log(decode) : 'esto es un error'
    // return (decode)? req.us
  } catch (err){
    console.log(err)
  }

}

app.get('/saludo', verifyToken, (req, res) => {
  res.json({
    message: 'hola amigos'
  })
})

app.post('/login', (req, res) => {
    let authEmail = req.body.email;
    let sql = `SELECT * FROM base_resto.users WHERE email = '${authEmail}'`;
    console.log(authEmail)
    db.query(sql, (err, result) => {
      console.log(result);
      if(result[0].email != authEmail){
        console.log(res);
        res.status(401).json({
          // wrong Email
          message: 'Unauthorized, wrong Email Or password'
        });
      } else {
        bcrypt.compare(`${req.body.password}`, `${result[0].password}`, function(bcryptErr, resultCompare) {
          if(resultCompare !== true){
            res.status(403).json({
              list: bcryptErr,
              // wrong password
              message: 'Forbidden, Wrong Email Or password'
            })
          } else {
            const user = result[0].email
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
