const express = require('express');
const cartRouter = require("./cartRoutes.js");
const storeRouter = require("./storeRoutes.js");
const userRouter = require("./userRoutes.js");
const itemRouter = require('./itemRoutes.js');
const paymentRouter = require('./paymentRoutes.js');
const orderRoutes = require('./orderRoutes.js');

const v1Router = express.Router();
v1Router.use('/user', userRouter)
v1Router.use('/item', itemRouter)
v1Router.use('/store', storeRouter)
v1Router.use('/mycart', cartRouter)
v1Router.use('/payment', paymentRouter)
v1Router.use('/orders', orderRoutes)
v1Router.get("/", (req, res) => {
    res.send("Hello World!");
  });
module.exports = v1Router