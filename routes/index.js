const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { validateSignUp, validateLogin } = require('../constants/validation');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
