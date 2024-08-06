//boiler plate

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor(){

  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async addItem(data) {

    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findByUser(userId){
    const order = await models.Order.findAll({
      where:{
       '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],

        },

      ],
    });
    return order;
  }

  async find() {
    const rta = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          attributes: ['name',],
        },

      ]
    });
    return rta;

  };
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],

        },
        'items'
      ],
    });
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }
  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);

    return rta;
  }
  async delete(id) {
    const order = await this.findOne(id);
    const rta = await order.destroy();
    return rta;
  }
}

module.exports = OrderService;
