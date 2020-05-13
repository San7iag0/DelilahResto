const express = require('express');
const server = express();
const jsonWTok = require("jsonwebtoken");

server.use(express.json())


// const Email = email;
// const Pass = pass;

const users = [
  {
    "userName": "Pepita",
    "fullName": "smith",
    "email": "pep@email.com",
    "phone": 123456,
    "Address": "123 calle falsa,sprinfield",
    "password": "123abc",
  },  
{
  name: "pedro", 
  email: "pedro@pp.com"
}]

const products = [{}]


/*
  {
    "userName": "Pepita",
    "fullName": "smith",
    "email": "pep@email.com",
    "phone": 123456,
    "Address":  ,
    "password":  ,
  }
*/

//ENDPOINTS
// function to created new users 
function agregarLog(req, res, next){
    console.log("acceso autorizado: " + req.path);
    next();
}
server.use(agregarLog);


server.post('/users/add', (req, res) => {
    // const user = req.body;
    //const {userName, fullName, email, phone, address, password} = req.body;
    // if (userName.lenght !== 0 || password.lenght !== 0){
    //   return res.status(400)
    //   .then(
    //     users.push(user)
    //     res.status(200).json({userName, fullName, email, phone, address, password });
    //   )  
    // }
    
    // else { 
    //   res.status(500).json({ error: "Error" });
    // }
    console.log(users);
    //res.json(req.body);
});


// validated the user 
function validateUser(req, res, next){
  const {email, pass} = req.body;
  if (email !== admin.email || pass !== admin.pass){
    res.status(400)
    .json('User or password incorrect');
  }else {
    console.log('sucessful validation');
    next();
  }
} 

server.post('/admin', validateUser, (req, res) => {
    res.json('access success')
});

server.get("/products/get", (req, res) => {
  res.json(products)
})

//see list of users 
server.get('/users', (req, res) => {
  res.json(users)
  res.status(200);
})


server.listen(3000, () => {
    console.log('server Runing');
})



//npm i express mysql2 sequelize 