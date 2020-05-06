const express = require('express');
const server = express();
server.use(express.json())

const admin = {email: "ttsbp@hotmail.com", pass: "bvaefG85"}

//Users 
const users = [
  {name: "Pepito", email: "pepito@correo.com"}
]

/*
  {
    name: "Pepita",
    Last Name: "smith"
    email: "pep@email.com"
  }
*/

// function to add a new user 
function agregarLog(re, res, next){
    console.log("acceso autorizado: " + re.path);
    next();
}
server.use(agregarLog);

server.post('/usuarios', verificar, (req, res) => {
    const usuario = req.body;
    users.push(usuario)
    console.log(users);
    res.json(req.body);
});

// validated the user 
function validarUsuario(req, res, next){
  const {email, pass} = req.body;
  if (email !== admin.email || pass !== admin.pass){
    res.status(400)
    .json('usuario o clave incorrecta');
  }else {
    console.log('validacion exitosa');
    next();
  }
} 

server.post('/admin', validarUsuario, (req, res) => {
    res.json('Acceso correcto')
});

server.get('/usuarios', (req, res) => {
  res.json(users)
})


server.listen(8080, () => {
    console.log('servidor corriendo');
})





//Verified if the Email was repeat 

const verificar = (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  users.forEach( user => {

      console.log(user.email);
    if (user.email === email) {
        
      res.json({error: 'Email repetido'})
    } else {
      next();
    }
  });
}



