const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      // Aligned to 10 to match reviewValidator (was 4 in the model, 10 in the validator)
      minlength: 10,
      maxlength: 500,
      required: [true, 'Requiere contenido para la reseña'],
    },
    rating: {
      type: Number,
      // Added range validation — previously accepted any number
      min: [1, 'La valoración mínima es 1'],
      max: [5, 'La valoración máxima es 5'],
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
  },
  // Added timestamps so we know when reviews were created/edited
  { timestamps: true },
);

module.exports = mongoose.model('review', ReviewSchema);
