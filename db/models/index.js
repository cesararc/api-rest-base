const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

const setUpModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));// este archivo es un index para todos los modelos
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Customer.associate(sequelize.models); // aqui se asocian los modelos
}

module.exports =  setUpModels ;
