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
const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/nito' } = process.env;
app.use(express.json());
app.use(cors());
app.options('*', cors());

// Database
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log('Connected successfully to database'));

// Logger de solicitudes
app.use(requestLogger);

// Rutas públicas (signup/signin sin auth)
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      // Added .required() — previously missing, allowing signin without a password
      password: Joi.string().required().min(6).max(12),
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
      // Added .required() — previously missing, allowing registration without a password
      password: Joi.string().required().min(6).max(12),
    }),
  }),
  createUser,
);

app.use('/workers', workersRouter);
app.use('/users', auth, usersRouter);

// 404 — catch unmatched routes before the error logger
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Control de errores
app.use(errorLogger);
app.use(errors()); // celebrate validation errors

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { statusCode = 500, message } = err;
  const errorMessage = message || 'Tuvimos un problema. Intentalo más tarde.';
  const stackTrace = process.env.NODE_ENV === 'production' ? undefined : err.stack;
  // Removed the spurious next() call that was here — sending a response
  // and then calling next() can trigger "headers already sent" errors.
  res.status(statusCode).json({ error: errorMessage, stack: stackTrace });
});

app.listen(PORT, () => {
  console.log(`Sirviendo en Puerto ${PORT}`);
});
