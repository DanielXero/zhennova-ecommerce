const { Router } = require('express');
const productsRoutes = require('./productsRoutes');
const usersRoutes = require('./usersRoutes');
const authRoutes = require("./authRoutes");

const mainRouter = Router();

mainRouter.use('/products', productsRoutes);
mainRouter.use('/users', usersRoutes);

// Auth
mainRouter.use("/auth", authRoutes);

module.exports = mainRouter;