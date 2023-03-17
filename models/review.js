const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 4,
    maxlength: 200,
    required: [true, 'Requiere contenido para la reseña'],
  },
  rating: {
    type: Number,
    required: [true, 'Requiere una valoración'],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'worker',
    required: true,
  },
});

module.exports = mongoose.model('review', ReviewSchema);
