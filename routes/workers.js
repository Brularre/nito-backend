const router = require('express').Router();

const {
  getWorkers,
  getWorker,
  createWorker,
  editWorker,
  deleteWorker,
} = require('../controllers/workers');

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.post('/', createWorker);
router.patch('/:id', editWorker);
router.delete('/:id', deleteWorker);

module.exports = router;
