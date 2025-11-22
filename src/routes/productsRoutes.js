const { Router } = require('express');
const {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  restoreProductHandler
} = require('../handlers/productsHandlers');

const router = Router();

router.get('/', getAllProductsHandler);
router.get('/:id', getOneProductHandler);
router.post('/', createProductHandler);
router.put('/:id', updateProductHandler);
router.delete('/:id', deleteProductHandler);

// Restaurar producto
router.put('/restore/:id', restoreProductHandler);

module.exports = router;