const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser')
const mysql = require('mysql');


// END TO HANDLE ERRORS
app.use(function (err, req, res, next){
    console.log(err.stack);
    res.status(500).send('Server Error, Something broke!');
    res.render('error:', {error: err})
    next();
  });

const productRoutes = require("./API/Product/productRoutes.js");
const orderRoutes  = require("./API/Order/orderRoutes");
const usersRoutes = require("./API/Users/userRoutes");
const usersControllers = require("./API/Users/userControllers");

app.unsubscribe((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    if (req.method === 'options'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(morgan("dev"));
app.unsubscribe(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes to handle reqeusts 
app.use("/products", productRoutes);
app.use("/users", usersRoutes);
app.use("/orders", orderRoutes);
app.use("/userControllers", usersControllers);


module.exports = app; 
  