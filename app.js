const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser')


// END TO HANDLE ERRORS
app.use(function (err, req, res, next){
    console.log(err.stack);
    res.status(500).send('Server Error, Something broke!');
    res.render('error:', {error: err})
    next();
  });

const productControllers = require("./API/Product/productControllers.js");
const orderControllers  = require("./API/Order/orderControllers");
const usersControllers = require("./API/Users/userControllers");
const usersControllersLogin = require("./API/Users/userControllersLogin");

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
app.use("/products", productControllers);
app.use("/users", usersControllers);
app.use("/orders", orderControllers);
app.use("/userControllers", usersControllersLogin);


module.exports = app; 
  
  