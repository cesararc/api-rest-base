const jwt = require('jsonwebtoken');
const { config } = require('./config/config');


const secret =  config.jwtToken;

const payload = { // el payload es lo que vamos a encryptar dentro de ese token la info sensible
  sub: 1,
  //scope: 'admin', //a veces se utiliza para manejar permisos
  role: 'customer',
  // tambien se puede agregar cualquier atributo que se quiera
};



function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}


module.exports = { signToken };
