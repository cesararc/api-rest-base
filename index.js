const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;


// creamoun algo en la ruta raiz y damos un arespuesa
app.get('/', (req, res) => {
  res.send('Hola')
});

app.get('/menu', (req, res) => {
  res.send('Hola')
});

app.get('/agents-ia', (req, res) => {
  res.json([{
    name: "Sales-Maste-GPT",
    id: 12
    },
    {
      name:"Sri-Master-GPT",
      id: 13
    }
  ])
});

app.get('/agent-ia', (req, res) => {
  res.json({
    name: "Sales-Maste-GPT",
    id: 12
  })
});

app.get('/products', (req, res) => {
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

app.get('/products/filter', (req, res) => {
  res.send('cesar');
}
)

app.get('/products/:id', (req, res) => {
  const {id} = req.params;
  // esa es la version ES6 si quieres la otra seria asi
  //const id = req.params.id;
  // con esa nomenclarutra de es6 es mejor se llama destructuracion es

  res.json({
    id,
    name: "Jarabe para la tos",
    price: 12
  })
});
//recibir parametros via navegador
app.get('/categories/:categorieId/products/:id', (req, res) => {
  const {id, categorieId} = req.params;


  res.json({
    categorieId,
    id,


  })
});

app.get('/users', (req, res) => {
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



app.get('/agent-phone-numbers', (req, res) => {
  res.json({
    number: "099748473",
    idAgent: 12
  })
});

app.get('/clients', (req, res) => {
  res.json('Hola')
});
// ahora le decimos al app que debe escuchar un puerto especifico
app.listen(port, () => {
  console.log('mi puerto');
});
