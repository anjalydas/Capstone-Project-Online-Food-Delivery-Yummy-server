const express = require('express');
const jwt = require('jsonwebtoken');
const { getAllUsers, getAUserById, addUser, updateAUserById, deleteAUserById, userLogin, userLogout, userProfile } = require('../../controllers/userControllers.js');
const authUser = require('../middlewares/authUser.js');
const userRouter = express.Router();



userRouter.get('/', getAllUsers)
userRouter.get('/:id', authUser, getAUserById)
userRouter.post('/:sign-up', addUser)
userRouter.post('/:login', userLogin)
userRouter.post('/:logout', authUser, userLogout)
userRouter.post('/:profile/:id', userProfile, authUser)
userRouter.patch('/:id', updateAUserById,  authUser)
userRouter.delete('/:id', deleteAUserById, authUser)
module.exports = userRouter
