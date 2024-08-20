const express = require('express');
const { getAllOrders, getOrderById, addOrder, updateOrderById, deleteOrderById } = require('../../controllers/orderControllers.js');
const authUser = require('../middlewares/authUser.js');
const authAdmin = require('../middlewares/authAdmin.js');
const authStoreVender = require('../middlewares/authStoreVender.js');

const orderRouter = express.Router();


orderRouter.use(express.json());

orderRouter.get('/', getAllOrders)
orderRouter.get('/:orderId', getOrderById)
orderRouter.post('/', addOrder, authUser)
orderRouter.patch('/:orderId', updateOrderById, authAdmin, authStoreVender, authUser)
orderRouter.delete('/:orderId', deleteOrderById, authAdmin, authStoreVender, authUser)
module.exports = orderRouter