const express = require('express');

const { faker } = require('@faker-js/faker');


const router = express.Router();


router.get('/', (req, res) => {
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


router.get('/filter', (req, res) => {
  res.send('agents');
}
)

router.get('/:id', (req, res) => {
  const {id} = req.params;
  // esa es la version ES6 si quieres la otra seria asi
  //const id = req.params.id;
  // con esa nomenclarutra de es6 es mejor se llama destructuracion es

  res.json({
    id,
    name: "mimijo vendedor",
    price: 12
  })
});

// app.get('/agents-ia', (req, res) => {
//   res.json([{
//     name: "Sales-Maste-GPT",
//     id: 12
//     },
//     {
//       name:"Sri-Master-GPT",
//       id: 13
//     }
//   ])
// });

// app.get('/agent-ia', (req, res) => {
//   res.json({
//     name: "Sales-Maste-GPT",
//     id: 12
//   })
// });

router.get('/phone-numbers', (req, res) => {
  res.json({
    number: "099748473",
    idAgent: 12
  })
});



module.exports = router;
