const express = require('express');
const bodyParser = require('body-parser');
const db = require('../../SQL/SQLRoutes');
const bcrypt = require('bcrypt');
const verifyToken = require('./userControllers')

const saltRounds = 10;

const app = express();
app.use(bodyParser.json());


const adminUsers = [
  {
    userName: "santi",
    fullName: "Beja ",
    email: "santi@email.com",
    phone: 345678,
    address: "123 fake st",
    password: 123456,
    admin: true
  },
  {
    userName: "Pepita",
    fullName: "smith",
    email: "pep@email.com",
    phone: 345678,
    address: "null",
    password: 123456,
    admin: true
  }
]

//EMP to get all the uses '/Users'
app.get('/', verifyToken, (req, res) => {
  let sql = 'SELECT * FROM base_resto.users';
  db.query(sql, (err, result) => {
    if(err){
      res.status(403).json({
        message: 'you dont have access'
      });
    } else {
      res.status(200).json({
        message: 'Users List',
        list: result
      });  
    }
  });
});

// EMP to get info by ID
app.get("/:userId", verifyToken, (req, res) => {
    const id = req.params.userId;
    let sql = `SELECT * FROM base_resto.users WHERE userId = ${id}`; 
    db.query(sql, (err, result) => {
      if(err){
        res.status(403).json({
          message: 'Wrong user Id'
        });
      } else {
        res.status(200).json({
          message: 'User information',
          list: result
        })
      }
    });
});

// EMP to created Users
app.post('/create', (req, res) => { 
  bcrypt.hash(`${req.body.password}`, saltRounds, function (err, hash) {   
    let sql = `INSERT INTO base_resto.users SET userName = '${req.body.userName}', fullName = '${req.body.fullName}', email = '${req.body.email}', phone = ${req.body.phone}, address = '${req.body.address}', password = '${hash}'`;
    db.query(sql, (err,  result) => {
      if(err){
        console.log(err);
        res.status(400).json({
          message: 'bad resquest'
        });
      } else {
        res.status(200).json({
          message: 'User create Successfully',
          list: result
        });
      }
    });
  });
});

//  EMP to update users
app.patch('/:userId', verifyToken, (req, res) => {
  const id = req.params.userId;
  let sql = `UPDATE base_resto.users SET userName = '${req.body.userName}', fullName = '${req.body.fullName}', email = '${req.body.email}', phone = ${req.body.phone}, address = '${req.body.address}' 
  WHERE userId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
        res.status(400).json({
          message: 'bad resquest'
        });
      } else {
        res.status(200).json({
          message: `you upgrade the user ID: ${id}`,
          list: result 
        });
      }
    });
});

// EMP to Delete users
app.delete('/:userId', verifyToken, (req, res) => {
  const id = req.params.userId;
  const sql = `DELETE FROM base_resto.users WHERE userId  = ${id}`;
  db.query(sql, (err, result) => {
    if(err){
      res.status(403).json({
        message: 'you dont have access'
      });
    } else {
      res.status(200).json({
        message: `you just deleted User ID: ${id}`,
        list: result
      });
    }
  });
});

module.exports =  app;
