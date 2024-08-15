const express = require('express');
const { getAllStores, addStore, getStoreById, updateStoreById, deleteStoreById } = require('../../controllers/storeControllers.js');
const authAdmin = require('../middlewares/authAdmin.js');
const authStoreVender = require('../middlewares/authStoreVender.js');
const storeRouter = express.Router();



storeRouter.get('/', getAllStores)
storeRouter.get('/:authorId', getStoreById)
storeRouter.post('/', addStore, authAdmin)
storeRouter.patch('/:authorId', updateStoreById, authAdmin, authStoreVender)
storeRouter.delete('/:authorId', deleteStoreById, authAdmin, authStoreVender)
module.exports = storeRouter