const router = require('express').Router();
const checkAuth = require('../middlewares/auth');
const workerValidation = require('../middlewares/workerValidator');
const reviewValidation = require('../middlewares/reviewValidator');

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

router.post('/', checkAuth, (req, res, next) => {
  const { error } = workerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return createWorker(req, res, next);
});

router.patch('/:id', checkAuth, (req, res, next) => {
  const { error } = workerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return editWorker(req, res, next);
});

router.delete('/:id', checkAuth, deleteWorker);

router.get('/:id/reviews', getReviewsByWorkerId);

// Added checkAuth — reviews require a logged-in user.
// Added reviewValidation — was defined but never applied to this route.
router.post('/:id/reviews', checkAuth, (req, res, next) => {
  const { error } = reviewValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return createReview(req, res, next);
});

// Fixed: both params were named :id, making req.params.id ambiguous.
// The review ID is now :reviewId, matching req.params.reviewId in the controller.
router.delete('/:id/reviews/:reviewId', checkAuth, deleteReview);

module.exports = router;
