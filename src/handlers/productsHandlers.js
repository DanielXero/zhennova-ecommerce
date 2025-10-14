// Handler para obtener todos los productos
const getAllProductsHandler = (req, res) => {
  const { name } = req.query; // Filtro opcional por nombre

  if (name) {
    return res.status(200).json({
      message: `Producto con nombre que contiene "${name}"`,
      products: [
        {
          id: 1,
          name: "Teclado Mecánico RGB",
          price: 85000,
          category: "Periféricos",
        },
        {
          id: 2,
          name: "Mouse Gaming 16000 DPI",
          price: 26200,
          category: "Periféricos",
        },
      ].filter((p) => p.name.toLowerCase().includes(name.toLowerCase())),
    });
  } else {
    res.status(200).json({
      message: "Lista de productos de Zhennova",
      products: [
        {
          id: 1,
          name: "Teclado Mecánico RGB",
          price: 85000,
          category: "Periféricos",
        },
        {
          id: 2,
          name: "Memoria RAM 16GB DDR4",
          price: 34000,
          category: "Componentes",
        },
        {
          id: 3,
          name: "Fuente de Poder 650W 80+ Bronze",
          price: 80000,
          category: "Componentes",
        },
        {
          id: 4,
          name: 'Monitor 24" 144Hz',
          price: 150000,
          category: "Periféricos",
        },
      ],
    });
  }
};

// Handler para obtener un producto por ID
const  getOneProductHandler = (req, res) => {
  const { id } = req.params;
  const productId = Number(id);

  // Simulación de búsqueda
  const listaProductos = {
    1: {
      id: 1,
      name: "Teclado Mecánico RGB",
      price: 8500,
      category: "Periféricos",
    },
    2: {
      id: 2,
      name: "Memoria RAM 16GB DDR4",
      price: 12000,
      category: "Componentes",
    },
    3: {
      id: 3,
      name: "Fuente de Poder 650W",
      price: 18000,
      category: "Componentes",
    },
  };

  const product = listaProductos[productId];

  if (!product) {
    return res.status(404).json({
      message: `Producto con ID ${id} no encontrado`,
    });
  } else {
      res.status(200).json({
    message: `Producto con ID ${id}`,
    product,
  });
  }


};

// Handler para crear un nuevo producto
const createProductHandler = (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "Faltan datos obligatorios: name, price y category",
    });
  } else {
  res.status(201).json({
    message: "Producto creado exitosamente",
    product: { id: Date.now(), name, price, category },
  });
  }


};

// Handler para actualizar un producto
const updateProductHandler = (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  res.status(200).json({
    message: `Producto con ID ${id} actualizado`,
    product: { id: Number(id), name, price, category },
  });
};

// Handler para eliminar un producto
const deleteProductHandler = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: `Producto con ID ${id} eliminado`,
  });
};

module.exports = {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
