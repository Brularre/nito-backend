const Worker = require('../models/worker');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');

function getWorkers(req, res, next) {
  Worker.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function createWorker(req, res, next) {
  const { name, area, city, email, telephone, link, location } = req.body;
  const creator = req.user._id;
  Worker.create({ name, area, city, email, telephone, link, location, creator })
    .then((worker) => {
      if (!worker) {
        throw new RequestError('Hay un problema ');
      }
      res.send(worker);
    })
    .catch(next);
}

function deleteWorker(req, res, next) {
  Worker.findByIdAndRemove(req.params.id)
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

module.exports = { getWorkers, createWorker, deleteWorker };
