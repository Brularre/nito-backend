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

const {
  getReviewsByWorkerId,
  createReview,
  deleteReview,
} = require('../controllers/reviews');

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.post('/', checkAuth, workerValidator, createWorker);
router.patch('/:id', checkAuth, workerValidator, editWorker);
router.delete('/:id', checkAuth, deleteWorker);

router.get('/:id/reviews', getReviewsByWorkerId);
router.post('/:id/reviews', createReview);
router.delete('/:id/reviews/:id', deleteReview);

module.exports = router;
