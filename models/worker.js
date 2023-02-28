const mongoose = require('mongoose');

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
  telephone: {
    type: String,
    default: 'No ingresado',
  },
  link: {
    type: String,
    default: 'No ingresado',
  },
  location: {
    type: [String],
    default: 'No ingresado',
  },
  rating: {
    type: [Number],
    default: [],
  },
  review: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('Worker', WorkerSchema);
