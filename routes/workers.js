const router = require('express').Router();
const checkAuth = require('../middlewares/auth');
const workerValidator = require('../middlewares/workerValidator');

const {
  getWorkers,
  getWorker,
  createWorker,
  editWorker,
  deleteWorker,
} = require('../controllers/workers');

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.post('/', checkAuth, workerValidator, createWorker);
router.patch('/:id', checkAuth, workerValidator, editWorker);
router.delete('/:id', checkAuth, deleteWorker);

module.exports = router;
