const { Router } = require('express');
const {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} = require('../handlers/usersHandlers');

const router = Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getOneUserHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);





module.exports = router;