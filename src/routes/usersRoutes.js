const { Router } = require('express');
const {
  getAllUsersHandler,
  getUserByIdHandler
} = require('../handlers/usersHandlers');

const router = Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);

module.exports = router;