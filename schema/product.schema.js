const Joi = require('joi');

//const id = Joi.string().guid({ version: 'uuidv4' });
// si lo hacemos separado de esta manera, la validacion aisla las validaciones especificas de cada campo y las reutiliza en diferentes funciones validadoras separando camopos requeridos de no requeridos
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(0);
const description = Joi.string().min(3).max(100);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();


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
  categoryid: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
