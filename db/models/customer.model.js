const { allow } = require('joi');
const { Model, DataTypes, Sequelize} = require('sequelize');
const  { USER_TABLE }  = require('./user.model');

const CUSTOMER_TABLE = 'customer';

const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    unique: true,
    references: { // aqui estamos diciendo que esta columna es una llave foranea
      model: USER_TABLE, //nombre de la tabla
      key: 'id',
    },
    onUpdate: 'CASCADE',//que hacer si se actualiza el id del usuario cascade es que se actualiza en todos los registros que tengan ese id
    onDelete: 'SET NULL',//que hacer si se elimina el usuario
  },
};

class Customer extends Model {
  static associate(models) { // aqui recibimos las relaciones que tiene el modelo con otros modelos
    this.belongsTo(models.User, { as: 'user' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
