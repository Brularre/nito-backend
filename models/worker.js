const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { Schema } = mongoose;

const WorkerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: 'No ingresado',
  },
  link: {
    type: String,
    default: 'No ingresado',
    validate: {
      validator: (v) => isURL(v),
      message: 'Por favor intenta una URL Valida.',
    },
  },
  telephone: {
    type: String,
    default: 'No ingresado',
  },
  location: {
    type: [String],
    default: 'No ingresado',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  ratings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Worker', WorkerSchema);
