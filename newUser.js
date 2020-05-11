const express = require('express');
const server = express();
server.use(express.json())
const email;
const pass;

//Users 
const users = [
  {name: "Pepito", email: "pepito@correo.com"}
]

/*
  {
    Usuario: "Pepita",
    Nombre y Apellido: "smith"
    Correo electronico: "pep@email.com"
    Telefono:
    Direccion de envio:
    Contraseña:
  }
*/

//ENDPOINTS
// function to created new users 
function agregarLog(req, res, next){
    console.log("acceso autorizado: " + req.path);
    next();
}
server.use(agregarLog);

server.post('/users/add', verificar, (req, res) => {
    const usuario = req.body;
    users.push(usuario)
    console.log(users);
    res.json(req.body);
});

//Verified if the Email is not repeat 
const verificar = (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  users.forEach( users => {

      console.log(user.email);
    if (user.email === email) {
        
      res.json({error: 'Email repetido'})
    } else {
      next();
    }
  });
}


// validated the user 

// function validarUsuario(req, res, next){
//   const {email, pass} = req.body;
//   if (email !== admin.email || pass !== admin.pass){
//     res.status(400)
//     .json('usuario o clave incorrecta');
//   }else {
//     console.log('validacion exitosa');
//     next();
//   }
// } 

// server.post('/admin', validarUsuario, (req, res) => {
//     res.json('Acceso correcto')
// });

//see list of users 
server.get('/users', (req, res) => {
  res.json(users)
})


server.listen(8080, () => {
    console.log('servidor corriendo');
})

