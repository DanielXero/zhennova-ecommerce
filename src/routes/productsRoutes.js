const { Router } = require('express');
const {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler
} = require('../handlers/productsHandlers');

const router = Router();

router.get('/', getAllProductsHandler);
router.get('/:id', getOneProductHandler);
router.post('/', createProductHandler);
router.put('/:id', updateProductHandler);
router.delete('/:id', deleteProductHandler);

module.exports = router;