const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500','http://localhost:8080','http://localhost:5432'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) { // si el origen esta en la lista blanca o no hay origen
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

// creamoun algo en la ruta raiz y damos un arespuesa
app.get('/', (req, res) => {
  res.send('Hola')
});

app.get('/menu', (req, res) => {
  res.send('Hola')
});



routerApi(app);


app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);




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


