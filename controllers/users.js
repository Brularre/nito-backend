const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

// Import Errors
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const ValidationError = require('../errors/validation-err');

// Converted from .then().catch() chains to async/await throughout.
// Fixed: createUser was throwing inside a .catch() callback instead of calling next(),
//   meaning the error was an unhandled rejection rather than being forwarded to Express.
// Fixed: createUser now handles duplicate-email errors (code 11000) explicitly.
// Fixed: login was catching ValidationError and re-throwing it (same unhandled rejection issue).
// Removed: dead `if (!user)` checks after .orFail() — orFail already guarantees a result.

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).orFail(
      () => new NotFoundError('No se encuentra usuario con esa id'),
    );
    res.send({ user });
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError('No se encuentra el usuario'),
    );
    res.send({ user });
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ name, email, password });
    res.status(201).send({ user });
  } catch (err) {
    if (err.code === 11000) {
      return next(new RequestError('Ya existe una cuenta con ese correo electrónico'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Hay un problema con los datos'));
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  login,
};
