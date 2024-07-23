const joi = require('joi');

const id = joi.number();
const customerId = joi.number().integer();
const orderId = joi.number().integer();
const productId = joi.number().integer();
const quantity = joi.number().integer.min(1);


const getOrderSchema = joi.object({
  id: id.required(),
});

const createOrderSchema = joi.object({
  customerId: customerId.required(),
});

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required(),
});


module.exports = { getOrderSchema, createOrderSchema, addItemSchema };
