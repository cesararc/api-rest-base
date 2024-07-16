// error.handler.js
//log errors
const { ValidationError } = require('sequelize');
const logErrors = (err, req, res, next) => {
  //imprimimos el error
  // esto es util para hacer tracking de los errores
  console.log('logErrors');
  console.error(err);
  // llamamos al siguiente middleware que es de tipo error sino mandamos en el next el error no se tratara como un middleware de error
  next(err);
}
// Global error handler middleware
const errorHandler = (err, req, res, next) => {

  console.log('errorHandler');
  // Send an error response to the client
  res.status(500).json({
     message: err.message,
     stack: err.stack,});
};


const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    next(err);
  }
}

module.exports = { errorHandler, logErrors, boomErrorHandler, ormErrorHandler};

