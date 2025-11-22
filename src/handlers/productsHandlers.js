const {
  createProductController,
  getAllProductsController,
  getProductsByNameController,
  getOneProductById,
  updateProductController,
  deleteProductController,
  restoreProductController
} = require("../controllers/productsControllers");

// Handler para obtener todos los productos
const getAllProductsHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (name) {
      const response = await getProductsByNameController(name);
      res.status(200).send(response);
    } else {
      const response = await getAllProductsController();
      res.status(200).send(response);
    }
  } catch (error) {
     next(error);
  }
};

// Handler para obtener un producto por ID
const getOneProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await getOneProductById(id);

    res.status(200).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para crear un nuevo producto
const createProductHandler = async (req, res, next) => {
  try {
    const response = await createProductController(req.body);

    res.status(201).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para actualizar un producto
const updateProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await updateProductController(id, req.body);
    res.status(200).send(response);
  } catch (error) {
     next(error);
  }
};

// Handler para eliminar un producto
const deleteProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deleteProductController(id);
    res.status(200).send(response);
  } catch (error) {
     next(error);
  }
};

const restoreProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await restoreProductController(id);
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
  restoreProductHandler
};
