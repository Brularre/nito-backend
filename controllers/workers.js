const Worker = require('../models/worker');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');

function getWorkers(req, res, next) {
  Worker.find({})
    .then((workers) => res.send({ data: workers }))
    .catch(next);
}

function getWorker(req, res, next) {
  Worker.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('No se encuentra especialista con esa id');
    })
    .then((worker) => {
      if (!worker) {
        throw new RequestError('Hay un problema con la solicitud');
      }
      res.send({ data: worker });
    })
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
    .catch((err) => {
      next(err);
    });
}

function editWorker(req, res, next) {
  const { name, area, city, email, telephone, link, location } = req.body;
  Worker.findByIdAndUpdate(
    req.params.id,
    {
      name,
      area,
      city,
      email,
      telephone,
      link,
      location,
    },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new RequestError('Hay un problema con la solicitud');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Hay un problema con los datos');
      }
      next();
    });
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

module.exports = {
  getWorkers,
  getWorker,
  createWorker,
  editWorker,
  deleteWorker,
};
