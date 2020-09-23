const jwt = require ('jsonwebtoken');

const secretKey = '$2y$12$kreEn1FLtAs9wf8iHudSyefxra4.NyK8NXEd7gKoxE6BxDXDDiuii';


// use the verify function jwt to confirm the token from the user
module.exports = function  verifyToken( req, res, next ){
    // check from hear, split 
    const token = req.headers['authorization'].split(' ')[1];
    const decode = jwt.verify( token, secretKey );
    if(decode){
      req.user = decode;
      return next();
    } else {
      res.json({
        error: 'Error verifying the User, you dont have access'
      })
    }
}
