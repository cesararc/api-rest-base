const { Strategy } = require('passport-local');

const UserService = require('../../services/user.service');
const service = new UserService();
const LocalStrategy = new Strategy(async (email, password, done ) => {
try {
  service.findEmail(email)
  if (!user) {
    done(boom.unauthorized(), false);
  }
  user.password;
  const isMatch = await bcrypt.compare(user.password, hash);
  if (!isMatch) {
    done(boom.unauthorized(), false);
  }
  done(null, user);

} catch (error) {
  done(error, false);
}
});

module.exports = LocalStrategy;

