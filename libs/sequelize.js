const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const  setUpModels  = require('./../db/models');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;



 // el pana ya utiliza la estrategia de pooling por detras

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
});

setUpModels(sequelize);


module.exports = sequelize;
