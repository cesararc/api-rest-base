const express = require('express');
const productsRouter = require('./products.router');
const agentsRouter = require('./agents.router');
const usersRouter = require('./users.router');





function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/agents', agentsRouter);
  router.use('/users', usersRouter);
}
module.exports = routerApi;
