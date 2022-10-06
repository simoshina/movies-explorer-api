const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new UnauthorizedError('Необходима авторизация.'));

  return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, payload) => {
    if (err) return next(new UnauthorizedError('Необходима авторизация.'));
    req.user = payload;
    return next();
  });
};
