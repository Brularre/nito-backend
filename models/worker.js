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
    // Previously had default: 'No ingresado' — a string on a [Number] field,
    // which is a type mismatch. Removed the invalid default.
    type: [Number],
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
    // Removed invalid ref: 'review' — ratings are plain Numbers, not ObjectIds
    type: [mongoose.Schema.Types.Number],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('worker', WorkerSchema);
