const express = require('express');

const { faker } = require('@faker-js/faker');


const router = express.Router();


router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });

  }
  res.json(products)
});


router.get('/filter', (req, res) => {
  res.send('cesar');
}
)

router.get('/:id', (req, res) => {
  const {id} = req.params;
  // esa es la version ES6 si quieres la otra seria asi
  //const id = req.params.id;
  // con esa nomenclarutra de es6 es mejor se llama destructuracion es
if(id === '999'){
  res.status(404).json({
    message: "Not Found"
  })
}else{
  res.status(200).json({
    id,
    name: "Jarabe para la tos",
    price: 12
  })
  }
});

router.post('/', (req, res) =>  {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  })
});

router.patch('/:id', (req, res) =>  {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'partial updated',
    data: body,
    id,
  })
});

router.delete('/:id', (req, res) =>  {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  })
});


router.put('/:id', (req, res) =>  {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: ' updated',
    data: body,
    id,
  })
});


module.exports = router;
