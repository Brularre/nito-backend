const Review = require('../models/review');
const Worker = require('../models/worker');
const NotFoundError = require('../errors/not-found-err');

// Converted fully to async/await for consistency.
// Fixed (security): createReview was taking `creator` from req.body, letting any client
//   claim any user ID as the review author. It now always uses req.user._id (the JWT payload).
// Fixed: deleteReview used deprecated findByIdAndRemove → findByIdAndDelete.
// Fixed: deleteReview used req.params.id which collided with the worker :id param.
//   It now uses req.params.reviewId (matching the corrected route /:id/reviews/:reviewId).
// Fixed: deleteReview error message said "especialista" when it should say "reseña".

async function getReviewsByWorkerId(req, res, next) {
  try {
    const worker = await Worker.findById(req.params.id)
      .populate('reviews')
      .orFail(() => new NotFoundError('No se encuentra especialista con esa id'));
    res.send({ data: worker.reviews });
  } catch (err) {
    next(err);
  }
}

async function createReview(req, res, next) {
  try {
    const { text, rating } = req.body;
    const review = await Review.create({
      text,
      rating,
      creator: req.user._id, // always the authenticated user — never from req.body
      worker: req.params.id,
    });
    await Worker.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { reviews: review._id, ratings: rating } },
      { new: true },
    ).orFail(() => new NotFoundError('No se encuentra especialista con esa id'));
    res.status(201).send(review);
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res, next) {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId).orFail(
      () => new NotFoundError('No se encuentra la reseña con esa id'),
    );
    res.send({ review });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getReviewsByWorkerId,
  createReview,
  deleteReview,
};
