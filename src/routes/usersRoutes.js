const { Router } = require('express');
const {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  restoreUserHandler
} = require('../handlers/usersHandlers');

const verifyToken = require("../middleware/verifyToken");
const autorizationAdmin = require('../middleware/authorizeMiddleware');

const router = Router();

router.get('/', verifyToken, autorizationAdmin, getAllUsersHandler);
router.get('/:id', getOneUserHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

// Restaurar usuario
router.put('/restore/:id', restoreUserHandler);





module.exports = router;