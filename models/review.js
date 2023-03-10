const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 10,
    maxlength: 500,
    required: [true, 'Requiere contenido para la reseña'],
  },
  rating: {
    type: Number,
    required: [true, 'Requiere una valoración'],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  reviewSubject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'worker',
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
