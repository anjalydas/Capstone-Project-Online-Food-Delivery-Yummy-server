const express = require('express');
const { getAllFoodItems, getFoodItemById, addFoodItem, updateFoodItemById, deleteFoodItemById, searchByItem } = require('../../controllers/itemControllers');
const authAdmin = require('../middlewares/authAdmin');
const authStoreVender = require('../middlewares/authStoreVender');
const authUser = require('../middlewares/authUser');
const itemRouter = express.Router();

itemRouter.use(express.json());
itemRouter.get('/search', searchByItem)
itemRouter.get('/', getAllFoodItems)
itemRouter.get('/:foodItemId', getFoodItemById)
itemRouter.post('/', addFoodItem, authAdmin, authStoreVender, authUser)
itemRouter.patch('/:foodItemId', updateFoodItemById, authAdmin, authStoreVender)
itemRouter.delete('/:foodItemId', deleteFoodItemById, authAdmin, authStoreVender)
module.exports = itemRouter