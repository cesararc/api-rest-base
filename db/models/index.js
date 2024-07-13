const { User, UserSchema } = require('./user.model');

const setUpModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));// este archivo es un index para todos los modelos
}

module.exports =  setUpModels ;
