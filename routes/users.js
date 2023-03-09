const router = require('express').Router();

const { getUsers, getUser, getCurrentUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUser);

module.exports = router;
