const {products} = require("../db/database");

const createProductController = (name, email) => {
  const id = products.length + 1;

  const newProduct = { id, name, price, category };
  if (!name || !price || !category) throw new Error("Los datos estan incompletos");
  products.push(newProduct);
  return newProduct;
};


const getAllProductsController = () => {
  return products;
};

const getProductsByNameController = (name) => {
  const productByName = products.filter((product) => product.name === name);
  if (!productByName.length)
    throw new Error("No se encontro el producto con ese nombre");
  return productByName;
};

const getOneProductById = (id) => {
  const productById = products.find((product) => product.id === Number(id));
  if (!productById) throw new Error("No se encontro el producto con ese ID");
  return productById;
};

const updateProductController = (id, name, price, category) => {
  const productById = products.find((product) => product.id === Number(id));

  if (!productById) {
    throw new Error(`No se encontró un producto con ID ${id}`);
  }

  const newProduct = { name, price, category };

  if (productById) {
    Object.assign(productById, newProduct);
  }
  return productById;
};

const deleteProductController = (id) => {
  const index = products.findIndex((product) => product.id === parseInt(id));

  if (index === -1) {
    throw new Error(`No se encontró un producto con ID ${id}`);
  }

  const deleteProductArray = products.splice(index, 1);

  const deleteProduct = deleteProductArray[0];
  return deleteProduct;
};

module.exports = {
  createProductController,
  getAllProductsController,
  getProductsByNameController,
  getOneProductById,
  updateProductController,
  deleteProductController,
};