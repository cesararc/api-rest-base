const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('./../../../config/config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //de donde va a sacar el token
  secretOrKey: config.jwtToken,
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
}); //creamos la estretegia y seria una instancia que nos sacamos de passport o de la libreria de passporto JWT



module.exports = JwtStrategy;

