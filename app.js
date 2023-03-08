const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// Routers
const workersRouter = require('./routes/workers');

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
app.get('/', (req, res) => {
  res.send('¡Bienvenido a Nito!');
});

app.use('/workers', workersRouter);

// Control de errores

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Sirviendo en Puerto ${PORT}`);
});
