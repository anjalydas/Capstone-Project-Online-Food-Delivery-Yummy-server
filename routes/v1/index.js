const express = require('express');
const cartRouter = require("./cartRoutes.js");
const storeRouter = require("./storeRoutes.js");
const userRouter = require("./userRoutes.js");
const itemRouter = require('./itemRoutes.js');
const orderRouter = require('./orderRoutes.js');

const v1Router = express.Router();
v1Router.use('/user', userRouter)
v1Router.use('/item', itemRouter)
v1Router.use('/store', storeRouter)
v1Router.use('/cart', cartRouter)
v1Router.use('/order', orderRouter)

module.exports = v1Router