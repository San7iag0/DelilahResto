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
    "admin": "true"
  },  
{
  name: "pedro", 
  email: "pedro@pp.com"
}]

const products = [{
  "name": "empanada",
  "price": "1k",
  "code": "1"
}]

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
// ENP new users 
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


// validated Admin user 
function validateUser(req, res, next){
  const {email, pass} = req.body;
  if (email && email !== admin.email && pass && pass !== admin.pass){
    res.status(400)
    .json('User or password incorrect');
  }else {
    console.log('sucessful validation');
    next();
  }
} 
// ENP login admin
server.post('/admin', validateUser, (req, res) => {
    res.json('access success')
});

//see list of users 
server.get('/users', (req, res) => {
  res.json(users)
  res.status(200);
})    


//ENP created a product
server.post("/products/add", validateUser, (req, res) => {
  if(req.body.user.admin == true){
    let{name, price, code} = req.body;
    addProduct(name, price, code);
    res.status(200).json({message: "Product added successfully", list: products})
  }else {
    res.status(401).json({message: "No Authorize"})
  }
  

});

// ENP get list of Products 
server.get("/products", (req, res) => {
  res.json(products);
  res.status(200);
})





server.listen(3000, () => {
    console.log('server Runing');
})



//npm i express mysql2 sequelize 