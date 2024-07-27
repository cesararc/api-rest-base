const express = require('express');

// aque no hay servicio por que el strategie ya contiene la logica
const passport = require('passport');

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;
