const router = require('express').Router();
const { validateUserInfo } = require('../constants/validation');
const { updateUserInfo, getUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
