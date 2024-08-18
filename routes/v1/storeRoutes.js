const express = require('express');
const { getAllStores, addStore, getStoreById, updateStoreById, deleteStoreById } = require('../../controllers/storeControllers.js');
const authAdmin = require('../middlewares/authAdmin.js');
const authStoreVender = require('../middlewares/authStoreVender.js');
const storeRouter = express.Router();


storeRouter.use(express.json());

storeRouter.get('/', getAllStores)
storeRouter.get('/:storeId', getStoreById)
storeRouter.post('/', addStore, authAdmin)
storeRouter.patch('/:storeId', updateStoreById, authAdmin, authStoreVender)
storeRouter.delete('/:storeId', deleteStoreById, authAdmin, authStoreVender)
module.exports = storeRouter