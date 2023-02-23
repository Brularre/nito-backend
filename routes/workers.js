const router = require('express').Router();

const { getWorkers } = require('../controllers/workers');

router.get('/', getWorkers);

module.exports = router;
