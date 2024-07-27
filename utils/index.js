const passport = require('passport');
const LocalStrategy = require('./auth/local.strategy');

passport.use(LocalStrategy);
