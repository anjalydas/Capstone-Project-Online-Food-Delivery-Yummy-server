const express = require('express');
const { getAllCartItems, addItemToCart, updateCartItemQuantity, removeCartItem } = require('../../controllers/cartControllers.js');
const authUser = require('../middlewares/authUser.js');
const cartRouter = express.Router();


cartRouter.use(express.json());
cartRouter.get('/', getAllCartItems, authUser)
cartRouter.post('/', addItemToCart, authUser)
cartRouter.patch('/:cartId', updateCartItemQuantity, authUser)
cartRouter.delete('/:cartId', removeCartItem, authUser)
module.exports = cartRouter