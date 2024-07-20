const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');
const { da } = require('@faker-js/faker');


class CustomerService {
  constructor() {

  }
  async create(data) {
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
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
