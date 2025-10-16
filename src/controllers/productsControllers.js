const { products } = require("../db/database");

const Joi = require("joi");

// Esquema de validación con Joi
const productSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre es obligatorio",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor que 0",
    "any.required": "El precio es obligatorio",
  }),
  category: Joi.string()
    .valid("Periféricos", "Componentes")
    .required()
    .messages({
      "any.only": 'La categoría debe ser "Periféricos" o "Componentes"',
      "string.empty": "La categoría no puede estar vacía",
      "any.required": "La categoría es obligatoria",
    }),
});

const createProductController = (productData) => {
  // Validación con Joi
  const { error } = userSchema.validate(productData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const { name, price, category } = productData;
  const id = products.length + 1;

  const newProduct = { id, name, price, category };
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

const updateProductController = (id, productData) => {
  const productById = products.find((product) => product.id === Number(id));

  if (!productById) {
    throw new Error(`No se encontró un producto con ID ${id}`);
  }

  const { error } = userSchema.validate(productData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, price, category } = productData;

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
