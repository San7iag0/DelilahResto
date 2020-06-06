const express = require("express");
const router = express.router();
const mongoose = require("mongoose");

const User = require("./userModel");

router.post("/singup", (res, req, next) => {
    const user =  new user({
        userName: String,
        fullName: String,
        email: {type: String, unique: true},
        phone: Number, 
        address: {type: String, unique: true},
        password: {type: String, select: false},    
        admin: Boolean
    }) ;  
}

module.exports = router;
