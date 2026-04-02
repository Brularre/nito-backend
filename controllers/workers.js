const Worker = require('../models/worker');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');

// Converted from .then().catch() chains to async/await throughout.
// Fixed: editWorker was sending { user } instead of { worker } in the response.
// Fixed: deleteWorker used deprecated findByIdAndRemove → findByIdAndDelete.
// Fixed: editWorker called next() with no arguments on unknown errors (silently swallowed them).

async function getWorkers(req, res, next) {
  try {
    const workers = await Worker.find({}).populate({
      path: 'reviews',
      populate: { path: 'creator' },
    });
    res.send({ workers });
  } catch (err) {
    next(err);
  }
}

async function getWorker(req, res, next) {
  try {
    const worker = await Worker.findById(req.params.id).orFail(
      () => new NotFoundError('No se encuentra especialista con esa id'),
    );
    res.send({ worker });
  } catch (err) {
    next(err);
  }
}

async function createWorker(req, res, next) {
  try {
    const { name, area, city, email, telephone, link, location } = req.body;
    const worker = await Worker.create({
      name,
      area,
      city,
      email,
      telephone,
      link,
      location,
      creator: req.user._id,
    });
    res.status(201).send({ worker });
  } catch (err) {
    next(err);
  }
}

async function editWorker(req, res, next) {
  try {
    const { name, area, city, email, telephone, link, location } = req.body;
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { name, area, city, email, telephone, link, location },
      { runValidators: true, new: true },
    ).orFail(() => new NotFoundError('No se encuentra especialista con esa id'));
    res.send({ worker });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Hay un problema con los datos'));
    }
    next(err);
  }
}

async function deleteWorker(req, res, next) {
  try {
    // findByIdAndRemove is deprecated since Mongoose 6 — use findByIdAndDelete
    const worker = await Worker.findByIdAndDelete(req.params.id).orFail(
      () => new NotFoundError('No se encuentra un especialista con esa id'),
    );
    res.send({ worker });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getWorkers,
  getWorker,
  createWorker,
  editWorker,
  deleteWorker,
};
