const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET } = process.env;

// Previously this threw errors directly, breaking the Express middleware chain.
// It now passes errors to next() so the central error handler picks them up.
function checkAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Se requiere autorización'));
  }

  const token = authorization.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return next(new UnauthorizedError('Token inválido o expirado'));
  }
}

module.exports = checkAuth;
