const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../../SQL/SQLRoutes');
const verifyToken = require('../../middlewares/middlewares');
const verifyAdmin = require('../../middlewares/middlewares');

app.use(bodyParser.json());


// EMP to get all orders list
// handle GET request to /oders/...
app.get("/", verifyAdmin, (req, res) =>{
    let sql = 'SELECT * FROM base_resto.orders';
    db.query(sql, (err, result) => {
        if(err){
            res.status(400);
        } else { 
            res.status(200).json({
                message: 'Orders list',
                list: result
            });
        }
    });
});

// EMP to get orders by userId
app.get("/user/:userId", verifyAdmin, (req, res) => {
    const id = req.params.userId;
        let sql = `SELECT * FROM base_resto.orders WHERE userId = ${id}`;
        db.query(sql, (err, result) => {
            if(err){
                res.status(400);
            } else {
              res.status(200).json({
                    message: `There you can find the list of orders for the user ID: ${id}`,
                    list: result 
                })
            }
        });
});


// EMP to create orders
app.post('/create', verifyAdmin, (req, res) => {
    const userId = req.body.userId;
        let sql = `INSERT INTO base_resto.orders SET products = "${req.body.products}", address = "${req.body.address}", userId = ${userId}`;
        db.query(sql, (err, result) => {
            if(err){
                res.status( ).json({
                message: 'bad resquest'
                });
            } else {
                res.status(200).json({
                    message: 'Order created successful',
                    list: result
                });
            }
        });  
});


app.patch('/update/:orderId', verifyAdmin, (req, res) => {
    const id = req.params.orderId;
        let sql = `UPDATE base_resto.orders SET products = "${req.body.products}", address = "${req.body.address}" WHERE orderId = ${id}`;
        db.query(sql, (err, result) => {
            if(err){
                res.status(400).json({
                    message: "Bad Request",
                    list: err
                })
            } else {
                res.status(200).json({
                    message: 'Order updated sucessful',
                    list: result
                })
            }
        });
});


// EMP TO DELETE ODERS
app.delete('/delete/:orderId', verifyAdmin, (req, res) => {
    const id = req.params.orderId;
        let sql = `DELETE FROM base_resto.orders WHERE orderId = ${id}`;
        db.query(sql, (err, result) => {
            if(err) {
                res.status(400).json({
                    message: "User Id does not exist"
                })
            } else {
                res.status(200).json({
                    message: `You delete successful the order ${id}`,
                    list: result
                })
            }
        })
});


module.exports = app;
