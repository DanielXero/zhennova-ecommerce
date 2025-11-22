const User = require("../models/User");
const Role = require("../models/Role");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

// Relación: Role 1 → * User
Role.hasMany(User, { foreignKey: "role_id", sourceKey: "id" });
User.belongsTo(Role, { foreignKey: "role_id", targetKey: "id" });

// Relación: Category 1 → * Product
Category.hasMany(Product, { foreignKey: "category_id", sourceKey: "id" });
Product.belongsTo(Category, { foreignKey: "category_id", targetKey: "id" });

// Relación: User 1 → * Cart
User.hasMany(Cart, { foreignKey: "user_id", sourceKey: "id" });
Cart.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

// Relación: Product 1 → * Cart
Product.hasMany(Cart, { foreignKey: "product_id", sourceKey: "id" });
Cart.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });

// Relación: User 1 → * Order
User.hasMany(Order, { foreignKey: "user_id", sourceKey: "id" });
Order.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

// Relación: Order 1 → * OrderItem
Order.hasMany(OrderItem, { foreignKey: "order_id", sourceKey: "id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", targetKey: "id" });

// Relación: Product 1 → * OrderItem
Product.hasMany(OrderItem, { foreignKey: "product_id", sourceKey: "id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });

module.exports = {
  User,
  Role,
  Product,
  Category,
  Cart,
  Order,
  OrderItem,
};
