// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

// Routers
const workersRouter = require('./routes/workers');
const usersRouter = require('./routes/users');

// Rutas & middleware
const app = express();
const { PORT = 3000 } = process.env;
app.use(express.json());
app.use(cors());
app.options('*', cors());

// Database
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/nito');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log('Connected successfully to database'));

// Logger de solicitudes
app.use(requestLogger);

// Rutas
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(12),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(40),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(12),
    }),
  }),
  createUser,
);

app.use('/workers', workersRouter);
app.use('/users', auth, usersRouter);

// Control de errores

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  const errorMessage = message || 'Tuvimos un problema. Intentalo más tarde.';
  const stackTrace = process.env.NODE_ENV === 'production' ? null : err.stack;
  res
    .status(statusCode || 500)
    .json({ error: errorMessage, stack: stackTrace });
  next();
});

app.listen(PORT, () => {
  console.log(`Sirviendo en Puerto ${PORT}`);
});
