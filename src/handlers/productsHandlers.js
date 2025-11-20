const {
  createProductController,
  getAllProductsController,
  getProductsByNameController,
  getOneProductById,
  updateProductController,
  deleteProductController,
} = require("../controllers/productsControllers");

// Handler para obtener todos los productos
const getAllProductsHandler = (req, res, next) => {
  try {
    const { name } = req.query;

    if (name) {
      const response = getProductsByNameController(name);
      res.status(200).send(response);
    } else {
      const response = getAllProductsController();
      res.status(200).send(response);
    }
  } catch (error) {
     next(error);
  }
};

// Handler para obtener un producto por ID
const getOneProductHandler = (req, res, next) => {
  try {
    const { id } = req.params;

    const response = getOneProductById(id);

    res.status(200).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para crear un nuevo producto
const createProductHandler = (req, res, next) => {
  try {
    const response = createProductController(req.body);

    res.status(201).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para actualizar un producto
const updateProductHandler = (req, res, next) => {
  try {
    const { id } = req.params;

    const response = updateProductController(id, req.body);
    res.status(200).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para eliminar un producto
const deleteProductHandler = (req, res, next) => {
  try {
    const { id } = req.params;

    const response = deleteProductController(id);
    res.status(200).send(response);
  } catch (error) {
     next(error);
  }
};

module.exports = {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
