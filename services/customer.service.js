const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');

const bcrypt = require('bcrypt');
const { de } = require('@faker-js/faker');


class CustomerService {
  constructor() {

  }
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };

    const newCustomer = await models.Customer.create(newData,{
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: [
        {
          association: 'user',
          attributes: ['email',],
        },
      ],
    });
    return rta;

  };
  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);

    return rta;
  }
  async delete(id) {
    const customer = await this.findOne(id);
    const rta = await customer.destroy();
    return rta;
  }
}
module.exports = CustomerService;
