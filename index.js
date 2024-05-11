const express = require('express');


const routerApi = require('./routes');
const app = express();

const port = 3000;

app.use(express.json());

// creamoun algo en la ruta raiz y damos un arespuesa
app.get('/', (req, res) => {
  res.send('Hola')
});

app.get('/menu', (req, res) => {
  res.send('Hola')
});

routerApi(app);






// //recibir parametros via navegador
// app.get('/categories/:categorieId/products/:id', (req, res) => {
//   const {id, categorieId} = req.params;


//   res.json({
//     categorieId,
//     id,


//   })
// });




// // ahora le decimos al app que debe escuchar un puerto especifico

 app.listen(port, () => {
   console.log('mi puerto');
 });


