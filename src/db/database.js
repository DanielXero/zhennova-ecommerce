// Roles de usuario
const roles = [
  { id: 1, name: 'user' },
  { id: 2, name: 'admin' }
];

// Categorías de productos
const categories = [
  { id: 1, name: 'Periféricos', description: 'Teclados, mouses, monitores, etc.' },
  { id: 2, name: 'Componentes', description: 'Placas madre, RAM, fuentes, etc.' },
  { id: 3, name: 'Almacenamiento', description: 'SSD, HDD, memorias USB' }
];


const users = [
  { id: 1, name: "Juan Pérez", email: "juan@zhennova.com", password: '1234', id_rol: 1 },
  { id: 2, name: "María López", email: "maria@zhennova.com", password: '1234', id_rol: 1 },
  { id: 3, name: "Carlos Gómez", email: "carlos@zhennova.com", password: '1234', id_rol: 1 },
];

// Productos
const products = [
  {
    id: 1,
    name: 'Teclado Mecánico RGB',
    description: 'Switches azules, retroiluminación RGB',
    price: 8500,
    stock: 50,
    categoryId: 1 // Periféricos
  },
  {
    id: 2,
    name: 'Memoria RAM 16GB DDR4',
    description: '3200MHz, para gaming y productividad',
    price: 12000,
    stock: 30,
    categoryId: 2 // Componentes
  },
  {
    id: 3,
    name: 'Fuente de Poder 650W 80+ Bronze',
    description: 'Certificación 80+ Bronze, modular',
    price: 80000,
    stock: 15,
    categoryId: 2
  }
];
// Carrito de compras (por usuario)
const cart = [
  {
    id: 1,
    userId: 1,      // Juan
    productId: 1,   // Teclado
    quantity: 1
  }
];

// Órdenes de compra
const orders = [
  {
    id: 'ord-001',
    userId: 2,
    totalAmount: 8500,
    status: 'paid', // pending, paid, shipped, delivered, cancelled
    createdAt: '2025-04-05T10:00:00Z',
    updatedAt: '2025-04-05T10:05:00Z'
  }
];

// Detalles de órdenes
const orderItems = [
  {
    id: 1,
    orderId: 'ord-001',
    productId: 1,
    quantity: 1,
    priceAtTime: 8500 // Precio al momento de la compra
  }
];

// Exportar todo
module.exports = {
  roles,
  categories,
  users,
  products,
  cart,
  orders,
  orderItems
};