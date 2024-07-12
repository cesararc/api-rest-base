const { Pool } = require('pg');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({
  connectionString: URI,
  // ssl: {
  //   rejectUnauthorized: false
  // }
});



//el primer servicio que genere la conexion va a servir para todas las demas por eso no hay que conectarnos aqui

module.exports = pool;
