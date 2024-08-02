const express = require('express');
//const { signToken } = require('./../token-sign');
// aque no hay servicio por que el strategie ya contiene la logica
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');


const secret = config.jwtToken;

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user  = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      //const token = signToken(payload); // tambien en las importamvciones podemos llamar de manera directa la libreria jwt
      const token = jwt.sign(payload, secret);
      res.json({
        token,
        user,
      });

      //res.json(req.user);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;
