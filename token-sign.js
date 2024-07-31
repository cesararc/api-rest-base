const jwt = require('jsonwebtoken');

const secret = 'mysecret'; //asi va a encriptar el header y al token, solo el backend debe saberlo

const payload = { // el payload es lo que vamos a encryptar dentro de ese token la info sensible
  sub: 1,
  //scope: 'admin', //a veces se utiliza para manejar permisos
  role: 'customer',
  // tambien se puede agregar cualquier atributo que se quiera
};

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const token = signToken(payload ,secret);
console.log(token);
