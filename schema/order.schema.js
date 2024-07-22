const joi = require('joi');

const id = joi.number();
const customerId = joi.number();

const getOrderSchema = joi.object({
  id: id.required(),
});

const createOrderSchema = joi.object({
  customerId: customerId.required(),
});



module.exports = { getOrderSchema, createOrderSchema };
