const boom = require('@hapi/boom');

const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKeyToken) {
    next();
  } else {
    next(boom.unauthorized('apiKey is required'));
  }
}

module.exports = checkApiKey;
