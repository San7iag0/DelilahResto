const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const db = require('../../SQL/SQLRoutes');
const verifyToken = require('../Users/userControllers');

app.use(bodyParser.json());


// EMP to get all orders list
// handle GET request to /oders
app.get("/", verifyToken, (req, res) =>{
    let sql = 'SELECT * FROM base_resto.orders';
    db.query(sql, (err, result) => {
        if(err){
            res.status(400)
        } else { 
            res.status(200).json({
                message: 'Orders list',
                list: result
            });
        }
    });
});


// EMP to get orders by userId
app.get("/:userId", (req, res) => {
    const id = req.params.userId;
        let sql = `SELECT * FROM base_resto.orders WHERE userId = ${id}`;
        db.query(sql, (err, result) => {
            if(err){
              console.log(err);
            } else {
              res.status(200).json({
                    // check for the name of the user on the message 
                    message: `There you can find the list of orders for ${id}`,
                    list: result 
                })
            }
        });
});


// check -- Just the admin will be able to create orders 
// EMP to create orders
app.post('/add', verifyToken, (req, res) => {
    const userId = req.body.userId;
        let sql = `INSERT INTO base_resto.orders SET products = "${req.body.products}", address = "${req.body.address}", userId = ${userId}`;
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(400).json({
                message: 'bad resquest'
                });
            } else {
                res.status(200).json({
                    message: 'Order created',
                    list: result
                });
            }
        });  
});


app.patch('/:orderId', verifyToken, (req, res) => {
    const id = req.params.orderId;
        let sql = `UPDATE base_resto.orders SET products = "${req.body.products}", address = "${req.body.address}" WHERE orderId = ${id}`;

        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.status(200).json({
                    message: 'Order updated sucessful',
                    list: result
                })
            }
        });
});


// EMP TO DELETE ODERS
// check just admins will be able to delete orders
app.delete('/delete/:orderId', verifyToken, (req, res) => {
    const id = req.params.orderId;
        let sql = `DELETE FROM base_resto.orders WHERE orderId = ${id}`;
        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
                // check
            } else {
                res.status(200).json({
                    message: `You delete the order #${id}`,
                    list: result
                })
            }
        })
});


module.exports = app;
