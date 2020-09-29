const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../../SQL/SQLRoutes');
const verifyToken = require('../../middlewares/middlewares');
const verifyAdmin = require('../../middlewares/middlewares')


const app = express();

app.use(bodyParser.json());

//EMP to get the product list 
app.get("/", verifyToken, (req, res) => {
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
app.post("/add", verifyAdmin, (req, res) => {
    let sql = `INSERT INTO base_resto.products SET productName = '${req.body.productName}', price = ${req.body.price}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
        res.status(400).json({
          message: 'Bad resquest'
        });
      } else {
        res.status(200).json({
          message: 'Product created successful',
          list: result
        });
    }      
    });
});

// get information of a product By the ID 
app.get("/:productId", verifyToken, (req, res) => {
  const id = req.params.productId;
  let sql = `SELECT * FROM base_resto.products WHERE productsId = ${id}`; 
  db.query(sql, (err, result) => {
    if(err){
      res.status(400).json({
        message: "Id does not exist",
        list: err
      })
    } else {
      res.status(200).json({
        message: 'product details',
        list: result
      })
    }
  });
});

app.patch('/:productId', verifyAdmin, (req, res) => {
  const id = req.params.productId;
    let sql = `UPDATE base_resto.products SET productName = '${req.body.productName}', price = ${req.body.price} WHERE productsId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        res.status(403).json({
          message: "Forbidden, you are no allowed",
          list: err
        });
      } else {
        res.status(200).json({
          message: `you updated successfully the product id: '${id}'`,
          list: result
        });
      }
    });
});


app.delete('/:productId', verifyAdmin, (req, res) => {
  const id = req.params.productId;
    const sql = `DELETE FROM base_resto.products WHERE productsId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        res.status(403).json({
          message: "Forbidden, you are no allowed",
          list: err
        });
      } else {
        res.status(200).json({
          message: `you have delete succesfully the product ID: ${id}`,
          list: result
        });
      }
    }); 
});

  module.exports = app;
