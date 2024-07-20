const { allow } = require('joi');
const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer',
  },
  createdAt: { // como estamos en javascript usamos camelCase que es lo mas comun, pero en sql se usa snake_case en cez de camel con respecto a la division
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    field: 'created_at',// con field tenemos lo mejor de los dos mundos
  },
};

class User extends Model {
  static associate(models) { //estaticos quiere decir que no necesitamos instanciar la clase para poder llamarlo o declararlo tambien nos permite llamarlo sin instanciar la clase
  this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' }); // aqui estamos diciendo que un usuario tiene un cliente
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false, // si no queremos que se cree created_at updated_at
    };
  }
}

module.exports = { User, UserSchema, USER_TABLE};
