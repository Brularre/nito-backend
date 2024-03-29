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
  link: {
    type: String,
    default: 'No ingresado',
  },
  telephone: {
    type: String,
    default: 'No ingresado',
  },
  location: {
    type: [Number],
    default: 'No ingresado',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'review',
    default: [],
  },
  ratings: {
    type: [mongoose.Schema.Types.Number],
    ref: 'review',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('worker', WorkerSchema);
