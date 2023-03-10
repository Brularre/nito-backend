const Review = require('../models/review');
const Worker = require('../models/worker');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');

function getReviewsByWorkerId(req, res, next) {
  Worker.findById(req.params.id)
    .then((worker) => res.send({ data: worker.reviews }))
    .catch(next);
}

function createReview(req, res, next) {
  const { text, rating, creator } = req.body;
  Review.create({ text, rating, creator, reviewSubject: req.params.id })
    .then((review) => {
      Worker.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { reviews: review._id } },
        { new: true },
      ).orFail(() => {
        throw new NotFoundError('No se encuentra objeto con esa id');
      });
    })
    .then((worker) => {
      res.status(201).send({ data: worker });
    })
    .catch(next);
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
