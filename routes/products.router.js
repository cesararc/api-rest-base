const express = require('express');
const ProductService = require('./../services/product.service');
const { logErrors, errorHandler } = require('./../middlewares/error.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schema/product.schema');


const router = express.Router();
const service = new ProductService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try{
    const products = await service.find(req.query);
    res.json(products);
    } catch (error) {
      next(error);
  }
});


router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
}
)

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
  const {id} = req.params;
  const product = await service.findOne(id);
  res.json(product);
} catch (error) {
  next(error);
}

});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) =>  {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
  catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) =>  {

  try {
    const { id } = req.params;

    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'partial updated',
      product,
    })
  } catch (error) {
    next(error);
  }


});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) =>  {
  try {

  const { id } = req.params;
  const deleteProduct = await service.delete(id);
  res.json(deleteProduct);
} catch (error) {
  next(error);
}
});


router.put('/:id', async (req, res) =>  {
  const { id } = req.params;
  const body = req.body;
  const updateProduct = await service.update(id, body);
  res.json({
    message: ' updated',
    data: updateProduct,
    id,
  })
});


module.exports = router;
