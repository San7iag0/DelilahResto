// first part of the proyect, focust on new users to make orders 

const express = require('express');
const server = express();
server.use(express.json());
const sign = require('jsonwebtoken');

//Inscritos
const users = [];
let inIncr = 0;

server.post("/usuarios", (req, res) => {
    const id = inIncr++;
    const newUser = {req.body, id};
    user[id] = newUser;
    res.status().json(usuarios[id]);
});


server.listen(3000, () => {
    console.log('servidor corriendo');
})



