// first part of the proyect, focust on new users to make orders 

const express = require('express');
const server = express();
server.use(express.json());
const sign = require('jsonwebtoken');

const prducts = require("./API/Product/products");
const User = require("./API/Users/Users");
const order = require("./API/Order/order");

//Inscritos
const users = [{
    name: "Pepita",
    LastName: "smith",
    email: "pep@email.com"
}];
let inIncr = 0;

server.post("/usuarios", (req, res) => {
    const id = inIncr++;
    const newUser = (req.body, id);
    user[id] = newUser;
    res.status().json(usuarios[id]);
});


server.listen(8080, () => {
    console.log('Server running');
})



