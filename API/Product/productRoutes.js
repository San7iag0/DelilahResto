const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../../SQL/SQLRoutes');
const verifyToken = require('../Users/userControllers');

const app = express();

app.use(bodyParser.json());
// const router = express.Router();

const exisUser = require('../Users/userRoutes');


//EMP to get the product list 
app.get("/", (req, res) => {
    let sql = 'SELECT * FROM base_resto.products;';
    db.query(sql, (err, result) => {
      if(err){
        res.status(400).json({
          message: "Bad Request"
        })
      } else {
        res.status(200).json({
          message: "Product list",
          list: result
        });
      }
    }); 
});


//Endpoint Create
app.post("/add", verifyToken, (req, res) => {
    let sql = `INSERT INTO base_resto.products SET productName = '${req.body.productName}', price = ${req.body.price}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
        res.status(400).json({
          message: 'bad resquest'
        });
      } else {
        res.status(200).json({
          message: 'Product created',
          list: result
        });
    }      
    });
});


//check 
// get information of a product By the ID 
app.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
    let sql = `SELECT * FROM base_resto.products WHERE productsId = ${id}`; 
    db.query(sql, (err, result) => {
      if(err){
        console(err);
      } else {
        res.status(200).json({
          message: 'product details',
          list: result
        })
      }
    });
});


//check 
//check updated products just by the admin 
app.patch('/:productId', verifyToken, (req, res) => {
  const id = req.params.productId;
    let sql = `UPDATE base_resto.products SET productName = '${req.body.productName}', price = ${req.body.price} WHERE productsId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.status(200).json({
          message: `you updated the product id: '${id}'`,
          list: result
        });
      }
    });
});

// check 
app.delete('/:productId', verifyToken, (req, res, next) => {
  const id = req.params.productId;
    const sql = `DELETE FROM base_resto.products WHERE productsId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.status(200).json({
          message: `you have errace the product ID: ${id}`,
          list: result
        });
      }
    }); 
});

  module.exports = app;
