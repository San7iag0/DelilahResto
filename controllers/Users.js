const express = require('express');
const server = express();
// const jsonWTok = require("jsonwebtoken");

server.use(express.json())

const users = [
  {
    "userName": "Pepita",
    "fullName": "smith",
    "email": "pep@email.com",
    "phone": 123456,
    "Address": "123 calle falsa,sprinfield",
    "password": "",
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

//add new users 
server.post('/users/add', (req, res) => {
    const addedUser = req.body;

      const {email, password} = req.body;
      console.log(email.lenght);
      console.log(password);
      for(var i = 0; i < users.lenght; i++){
          if( email !== users[i].email ){
            users.push(addedUser)
          return res.status(200).json({ message: "user added successfully", list: users});
      }
      return res.status(500).json({ error: "Error" });}
        // 
        //email && email.lenght !== 0 && password && password.lenght !== 0 
      
      
    console.log(users);
});


// validated the user 
function validateUser(req, res, next){
  const {email, pass} = req.body;
  if (email !== user.email || pass !== user.pass){
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