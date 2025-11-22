const { Router } = require('express');
const {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  restoreProductHandler
} = require('../handlers/productsHandlers');

const verifyToken = require("../middleware/verifyToken");
const autorizationAdmin = require('../middleware/authorizeMiddleware');

const router = Router();

router.get('/', getAllProductsHandler);
router.get('/:id', getOneProductHandler);
router.post('/', verifyToken, autorizationAdmin, createProductHandler);
router.put('/:id', verifyToken, autorizationAdmin, updateProductHandler);
router.delete('/:id', verifyToken, autorizationAdmin, deleteProductHandler);

// Restaurar producto
router.put('/restore/:id', verifyToken, autorizationAdmin, restoreProductHandler);

module.exports = router;