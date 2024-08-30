const express = require('express');
const { getAllStores, addStore, getStoreById, updateStoreById, deleteStoreById } = require('../../controllers/storeControllers.js');
const authAdmin = require('../middlewares/authAdmin.js');
const authStoreVender = require('../middlewares/authStoreVender.js');
const storeRouter = express.Router();


storeRouter.use(express.json());

storeRouter.get('/store', getAllStores)
storeRouter.get('/store/:storeId', getStoreById)
storeRouter.post('/store', addStore, authAdmin)
storeRouter.patch('/store/:storeId', updateStoreById, authAdmin, authStoreVender)
storeRouter.delete('/store/:storeId', deleteStoreById, authAdmin, authStoreVender)
module.exports = storeRouter