const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
//const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
// const pool = require('../libs/postgres.pool');
const bcrypt = require('bcrypt');



class UserService {
  constructor() {
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));
  }
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;

    return newUser;
  }
  async find() {
    const query = 'SELECT * FROM users';
    const rta = await models.User.findAll({
      include: [
        'customer'
      ],
    });
    return rta;

  };
  async findEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }
  async delete(id) {
    const user = await this.findOne(id);
    const rta = await user.destroy();
    return rta;
  }
}
module.exports = UserService;
