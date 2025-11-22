const { Product } = require("../db/associations");

const Joi = require("joi");

// Esquema de validación con Joi
const productSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  description: Joi.string().optional().allow("", null),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor que 0",
    "number.precision": "El precio debe tener máximo 2 decimales",
    "any.required": "El precio es obligatorio",
  }),
  stock: Joi.number().integer().min(0).optional().default(0).messages({
    "number.base": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
  }),
  category_id: Joi.number().integer().required().messages({
    "number.base": "El ID de categoría debe ser un número entero",
    "any.required": "La categoría es obligatoria",
  }),
});

// Crear un nuevo producto
const createProductController = async (productData) => {
  const { error } = productSchema.validate(productData, { stripUnknown: true });
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, description, price, stock, category_id } = productData;

  // Verificar si ya existe un producto con ese nombre
  const existingProduct = await Product.findOne({
    where: { name },
    paranoid: false,
  });
  if (existingProduct) {
    throw new Error("Ya existe un producto con ese nombre");
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    stock,
    category_id,
  });

  const { deletedAt, ...productWithoutDeletedAt } = newProduct.toJSON();
  return productWithoutDeletedAt;
};

// Obtener todos los productos (activos)
const getAllProductsController = async () => {
  const products = await Product.findAll({
    attributes: { exclude: ["deletedAt"] },
  });
  return products;
};

// Obtener productos por nombre (búsqueda parcial)
const getProductsByNameController = async (name) => {
  const products = await Product.findAll({
    where: {
      name: {
        [Product.sequelize.Op.iLike]: `%${name}%`,
      },
    },
    attributes: { exclude: ["deletedAt"] },
  });
  if (products.length === 0) {
    throw new Error("No se encontraron productos con ese nombre");
  }
  return products;
};

// productById

const getOneProductById = async (id) => {
  const productById = await Product.findByPk(id, {
    attributes: { exclude: ["deletedAt"] },
  });
  if (!productById) {
    throw new Error("Producto no encontrado");
  }
  return productById;
};

// Actualizar un producto por ID
const updateProductController = async (id, productData) => {
  // Validación
  const { error } = productSchema.validate(productData, { stripUnknown: true });
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Buscar producto (incluye eliminados)
  const product = await Product.findByPk(id, { paranoid: false });
  if (!product) {
    throw new Error("Producto no encontrado");
  }

  // Si estaba eliminado, restaurarlo
  if (product.deletedAt !== null) {
    await product.restore();
  }

  // Actualizar
  await product.update(productData);

  // Devolver sin deletedAt
  const { deletedAt, ...productWithoutDeleted } = product.toJSON();
  return productWithoutDeleted;
};


// Eliminar (baja lógica) un producto por ID
const deleteProductController =async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Producto no encontrado");
  }

  await product.destroy(); // Esto solo pone deleted_at = NOW()

  const { deletedAt, ...deletedProduct } = product.toJSON();
  return deletedProduct;
};

// Restaurar un producto eliminado
const restoreProductController = async (id) => {
  const product = await Product.findByPk(id, { paranoid: false });
  if (!product) {
    throw new Error("Producto no encontrado");
  }

  if (!product.deletedAt) {
    throw new Error("El producto no está eliminado");
  }

  await product.restore(); // Esto pone deleted_at = NULL

  const { deletedAt, ...restoredProduct } = product.toJSON();
  return restoredProduct;
};  

module.exports = {
  createProductController,
  getAllProductsController,
  getProductsByNameController,
  getOneProductById,
  updateProductController,
  deleteProductController,
  restoreProductController
};
