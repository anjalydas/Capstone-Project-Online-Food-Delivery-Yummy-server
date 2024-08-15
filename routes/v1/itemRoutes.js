const express = require('express');
const { getAllFoodItems, getFoodItemById, addFoodItem, updateFoodItemById, deleteFoodItemById } = require('../../controllers/itemControllers');
const authAdmin = require('../middlewares/authAdmin');
const authStoreVender = require('../middlewares/authStoreVender');
const itemRouter = express.Router();



itemRouter.get('/', getAllFoodItems)
itemRouter.get('/:itemId', getFoodItemById)
itemRouter.post('/', addFoodItem, authAdmin, authStoreVender)
itemRouter.patch('/:itemId', updateFoodItemById, authAdmin, authStoreVender)
itemRouter.delete('/:itemId', deleteFoodItemById, authAdmin, authStoreVender)
module.exports = itemRouter