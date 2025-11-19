const { Router } = require('express');
const {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} = require('../handlers/usersHandlers');

const verifyToken = require("../middleware/verifyToken");
const autorizationAdmin = require('../middleware/authorizeMiddleware');

const router = Router();

router.get('/', verifyToken, autorizationAdmin, getAllUsersHandler);
router.get('/:id', getOneUserHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);





module.exports = router;