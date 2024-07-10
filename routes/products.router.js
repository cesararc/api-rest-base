const express = require('express');
const ProductService = require('./../services/product.service');
const { logErrors, errorHandler } = require('./../middlewares/error.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schema/product.schema');


const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
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
  async (req, res) =>  {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'created',
    data: newProduct,
  })
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
