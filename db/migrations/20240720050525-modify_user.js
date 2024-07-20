'use strict';
const { CustomerSchema, CUSTOMER_TABLE, } = require('./../models/customer.model');
const { Model, DataTypes, Sequelize} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    unique: true,


   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'name');
  }
};
