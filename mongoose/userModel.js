'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({ 
    userName: string,
    fullName: string,
    email: {type: String, unique: true, lowecase: true},
    phone: Number, 
    address: {type: string, unique: true},
    password: {type: string, select: false} 
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
