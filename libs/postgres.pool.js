const { Pool } = require('pg');



const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'nico',
  password: 'admin123',
  database: 'my_store',
});



//el primer servicio que genere la conexion va a servir para todas las demas por eso no hay que conectarnos aqui

module.exports = pool;
