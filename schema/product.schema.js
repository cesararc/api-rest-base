const Joi = require('joi');

//const id = Joi.string().guid({ version: 'uuidv4' });
// si lo hacemos separado de esta manera, la validacion aisla las validaciones especificas de cada campo y las reutiliza en diferentes funciones validadoras separando camopos requeridos de no requeridos
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(0);
const description = Joi.string().min(3).max(100);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer().min(1).max(100);
const offset = Joi.number().integer().min(0);
const max_price = Joi.number().integer().min(0);
const min_price = Joi.number().integer().min(0);


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  min_price,
  max_price: max_price.when('min_price', {
    is: Joi.number().required(),
    then: Joi.number().greater(Joi.ref('min_price')),
  }),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
