const router = require('express').Router();
const deleteUser = require('../controllers/users/deleteUser');
const getUser = require('../controllers/users/getUser');
const updateUser = require('../controllers/users/updateUser');

router.get('/', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
