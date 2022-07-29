const router = require('express').Router();
const loginUser = require('../controllers/auth/loginUser');
const registerUser = require('../controllers/auth/registerUser');

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
