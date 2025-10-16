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
  const { name } = req.query;

  if (name) {
    const response = getProductsByNameController(name);
    res.status(200).send(response);
  } else {
    const response = getAllProductsController();
    res.status(200).send(response);
  }
};

// Handler para obtener un producto por ID
const getOneProductHandler = (req, res) => {
  const { id } = req.params;

  const response = getOneProductById(id);

  res.status(200).send(response);
};

// Handler para crear un nuevo producto
const createProductHandler = (req, res) => {
  const { name, price, category } = req.body;

   const response = createProductController(name, price, category);

  res.status(201).send(response);
};

// Handler para actualizar un producto
const updateProductHandler = (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  const response = updateProductController(id, name, price, category);
  res.status(200).send(response);
};

// Handler para eliminar un producto
const deleteProductHandler = (req, res) => {
  const { id } = req.params;

  const response = deleteProductController(id);
  res.status(200).send(response);
};

module.exports = {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
