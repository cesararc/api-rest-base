const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');

const setUpModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));// este archivo es un index para todos los modelos
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));



  User.associate(sequelize.models); // aqui se asocian los
  Customer.associate(sequelize.models); // aqui se asocian los modelos
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports =  setUpModels ;

