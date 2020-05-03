const express = require('express');
const server = express();
server.use(express.json())

//devolver un 400 si el usuario ya esta registrado, 
const admin = {email: "admin@aol.com", pass: "1234"}
//Inscritos
const users = [
  {nombre: "ejemplo", email: "ejemplo@email.com"},
  {nombre: "Pepito", email: "pepito@correo.com"}
]

/*Ejemplo de usuario
  {
    id: 1,
    nombre: "Pepito",
    email: "pepito@email.com"
    contraseña
  }
*/

// funcion para el usuario administrador  
function agregarLog(re, res, next){
    console.log("acceso autorizado: " + re.path);
    next();
}
server.use(agregarLog);



function validarUsuario(req, res, next){
  const {email, pass} = req.body;
  if (email !== admin.email || pass !== admin.pass){
    res.status(400)
    .json('usuario o clave incorrecta');
  }else {
    console.log('Validado');
    next();
  }
}

//Verificar el email repetido
const verificar = (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  users.forEach( user => {

      console.log(user.email);
    if (user.email === email) {

    } else {
      next();
    }
  });
}

server.post('/usuarios', verificar, (req, res) => {
    const usuario = req.body;
    users.push(usuario)
    console.log(users);
    res.json(req.body);
});

server.post('/admin', validarUsuario, (req, res) => {
    res.json('Acceso correcto')
});

server.get('/usuarios', (req, res) => {
  res.json(users)
})

server.listen(3000, () => {
    console.log('servidor corriendo');
})



