const { Router } = require('express');
const productsRoutes = require('./productsRoutes');
const usersRoutes = require('./usersRoutes');

const mainRouter = Router();

mainRouter.use('/products', productsRoutes);
mainRouter.use('/users', usersRoutes);

module.exports = mainRouter;