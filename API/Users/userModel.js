'use strict'

const express = require("express");
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');


const UserSchema = new Schema({ 
    id: Number,
    userName: String,
    fullName: String,
    email: {type: String, unique: true},
    phone: Number, 
    address: {type: String, unique: true},
    password: {type: String, select: false},    
    admin: Boolean
})
// created password and hash to incrypted 
UserSchema.pre('save', (next) => {
    let user = this
    if (!user.ismodified('password')) return next()
    
    bcrypt.genSalt(10, (err, salt) => { 
        if (err) return next()
        
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema)

