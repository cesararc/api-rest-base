const express = require('express');




const router = express.Router();

router.get('/', (req, res) => {
  const {limit, offset} = req.query;
if(limit && offset){
  res.json({
    limit,
    offset


  });
} else{
  res.send('no hay parametross')
}


});
router.get('/clients', (req, res) => {
  res.json('Hola')
});

router.get('/office', (req, res) => {
  const agents = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    agents.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });

  }
  res.json(agents)
});


module.exports = router;
