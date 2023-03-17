const Review = require('../models/review');
const Worker = require('../models/worker');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');

function getReviewsByWorkerId(req, res, next) {
  Worker.findById(req.params.id)
    .populate('reviews')
    .then((worker) => res.send({ data: worker.reviews }))
    .catch(next);
}

async function createReview(req, res, next) {
  try {
    const { text, rating, creator } = req.body;
    const review = await Review.create({
      text,
      rating,
      creator,
      worker: req.params.id,
    });
    const worker = await Worker.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reviews: review._id, ratings: rating } },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError('No se encuentra objeto con esa id');
    });
    res.status(201).send({ worker });
  } catch (error) {
    next(error);
  }
}

function deleteReview(req, res, next) {
  Review.findByIdAndRemove(req.params.id)
    .orFail(() => {
      throw new NotFoundError('No se encuentra un especialista con esa id');
    })
    .then((worker) => {
      if (!worker) {
        throw new RequestError('Hay un problema con la solicitud');
      }
      res.send(worker);
    })
    .catch(next);
}

module.exports = {
  getReviewsByWorkerId,
  createReview,
  deleteReview,
};
