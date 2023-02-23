const Worker = require('../models/worker');

function getWorkers(req, res, next) {
  Worker.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

module.exports = { getWorkers };
