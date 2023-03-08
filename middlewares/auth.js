const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/validation-err');

const { JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new ValidationError('Se requiere autorización');
};

function checkAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return handleAuthError();
  }
  return null;
}

module.exports = checkAuth;
