const {
  createProductController,
  getAllProductsController,
  getProductsByNameController,
  getOneProductById,
  updateProductController,
  deleteProductController,
} = require("../controllers/productsControllers");

// Handler para obtener todos los productos
const getAllProductsHandler = (req, res) => {
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
    res.status(400).send({ Error: error.message });
  }
};

// Handler para obtener un producto por ID
const getOneProductHandler = (req, res) => {
  try {
    const { id } = req.params;

    const response = getOneProductById(id);

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Handler para crear un nuevo producto
const createProductHandler = (req, res) => {
  try {
    const response = createProductController(req.body);

    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Handler para actualizar un producto
const updateProductHandler = (req, res) => {
  try {
    const { id } = req.params;

    const response = updateProductController(id, req.body);
    res.status(200).send(response);
  } catch (error) {}
};

// Handler para eliminar un producto
const deleteProductHandler = (req, res) => {
  try {
    const { id } = req.params;

    const response = deleteProductController(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
