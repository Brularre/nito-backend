const router = require('express').Router();
const checkAuth = require('../middlewares/auth');
const workerValidation = require('../middlewares/workerValidator');

const {
  getWorkers,
  getWorker,
  createWorker,
  editWorker,
  deleteWorker,
} = require('../controllers/workers');

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.post('/', checkAuth, (req, res, next) => {
  const { error } = workerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return createWorker(req, res, next);
});

// Funciones futuras
router.patch('/:id', checkAuth, (req, res, next) => {
  const { error } = workerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return editWorker(req, res, next);
});
router.delete('/:id', checkAuth, deleteWorker);

module.exports = router;
