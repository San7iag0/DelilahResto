const express = require('express');
const mysql = require('mysql');

// created connection
const connection = mysql.createConnection({
    host:'localhost',
    user: 'santi',
    password:'Keeper20'
    // database : Data_Base
});
// connect
connection.connect((err) => {
    if(err){
    console.log(err);
} 
console.log('MYSQL Connected....');
}); 

module.exports = connection;
