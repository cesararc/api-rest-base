const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const pool = require('../libs/postgres.pool');


class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  async create(data) {
    return data;
  }
  async find() {
    const query = 'SELECT * FROM tasks'; //llamamos a get connection
    const rta = await this.pool.query('SELECT * FROM tasks'); //guardamos la respuesta en rta de la consulta de la tabla tasks ya tenemos el cliente con el getConnection
    return rta.rows;//lo retornamos en filas
  };
  async findOne(id) {
    return { id };
  }
  async update(id, changes) {
    return { id, changes };
  }
  async delete(id) {
    return { id };
  }
}
module.exports = UserService;
