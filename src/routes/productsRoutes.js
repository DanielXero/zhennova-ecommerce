const { Router } = require('express');
const {
  getAllProductsHandler,
  getProductByIdHandler
} = require('../handlers/productsHandlers');

const router = Router();

router.get('/', getAllProductsHandler);
router.get('/:id', getProductByIdHandler);

module.exports = router;