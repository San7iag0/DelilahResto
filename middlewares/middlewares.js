const jwt = require ('jsonwebtoken');
const app = require('../API/Product/productControllers');

const secretKey = '$2y$12$kreEn1FLtAs9wf8iHudSyefxra4.NyK8NXEd7gKoxE6BxDXDDiuii';

// use the verify function jwt to confirm the token from the user
module.exports = function  verifyToken( req, res, next ){
  const confirmToken = req.headers['authorization'];
    if(confirmToken != ''){
      const token = req.headers['authorization'].split(' ')[1];
      const decode = jwt.verify( token, secretKey );
        if(decode){
          req.user = decode;
          return next();
        } else {
          res.json({
            mesage: 'Error verifying the User, you dont have access'
          });
        }
    } else {
      res.json({
        message: 'you are missing the token'
      })
    }
}

module.exports = function verifyAdmin(req, res, next){
  const token = req.headers['authorization'].split(' ')[1];
  const data = jwt.verify( token, secretKey );
    if(data.user.admin == 1) {
        return next();
    } else {
        res.status(401).json({
            message: 'you dont have access'
        });
    }
}
