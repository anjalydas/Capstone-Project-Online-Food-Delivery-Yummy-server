const express = require('express');
const authUser = require('../middlewares/authUser');
const { createOrder, getUserOrders, updateOrderStatus, removeOrder, getAllOrders } = require('../../controllers/orderControllers');
const orderRoutes = express.Router();


orderRoutes.use(express.json());
orderRoutes.post('/', createOrder, authUser)
orderRoutes.get('/', authUser, getAllOrders)
orderRoutes.get('/:orderId',authUser, getUserOrders)
orderRoutes.patch('/:orderId',updateOrderStatus)
orderRoutes.delete('/:orderId', removeOrder)
module.exports = orderRoutes;