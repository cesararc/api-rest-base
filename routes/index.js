const express = require('express');
const productsRouter = require('./products.router');
const agentsRouter = require('./agents.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const categoriesRouter = require('./categories.router');
const orderRouter = require('./orders.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');





function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/agents', agentsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}
module.exports = routerApi;
