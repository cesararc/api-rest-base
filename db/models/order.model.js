const {Model, DataTypes, Sequelize} = require('sequelize');

const ORDER_TABLE = 'orders';
const { CUSTOMER_TABLE } = require('./customer.model');


const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items) {
        return this.items.reduce((total, item) => total + item.price * item.OrderProduct.quantity, 0);
      }
      return 0;
    },
  }
};

class Order extends Model {//tenemos la orden y tiene variositems de compra
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      as: 'items',
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE};
