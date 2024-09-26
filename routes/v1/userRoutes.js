const express = require('express');
const jwt = require('jsonwebtoken');
const { getAllUsers, getAUserById, addUser, updateAUserById, deleteAUserById, userLogin, userLogout, userProfile, checkUser } = require('../../controllers/userControllers.js');
const authUser = require('../middlewares/authUser.js');
const authAdmin = require('../middlewares/authAdmin.js');
const authStoreVender = require('../middlewares/authStoreVender.js');
const userRouter = express.Router();



userRouter.get('/', getAllUsers)
userRouter.get('/:id', getAUserById)
userRouter.post('/:sign-up', addUser)
userRouter.post('/:login', userLogin)
userRouter.get('/:logout', authUser, userLogout)
userRouter.post('/:profile/:id', userProfile, authUser)
userRouter.get('/:id', checkUser, authUser, authAdmin, authStoreVender)
userRouter.patch('/:id', updateAUserById, authAdmin, authUser)
userRouter.delete('/:id', deleteAUserById, authAdmin, authUser)
module.exports = userRouter