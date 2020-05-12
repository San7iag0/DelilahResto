const express = require('express');
const server = express();
server.use(express.json())

// const Email = email;
// const Pass = pass;

//Users 
const users = [{
  name: "pedro", 
  email: "pedro@pp.com"
}]

/*
  {
    "UserName": "Pepita",
    "fullName": "smith"
    "Email": "pep@email.com"
    "phone": 123456
    "Address": 
    "password": 
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
    const usuario = req.body;
    users.push(usuario)
    console.log(users);
    res.json(req.body);
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



//see list of users 
server.get('/users', (req, res) => {
  res.json(users)
})


server.listen(3000, () => {
    console.log('server Runing');
})



//npm i express mysql2 sequelize 