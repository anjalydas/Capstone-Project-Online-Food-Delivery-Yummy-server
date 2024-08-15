const express = require('express');
const { getAllUsers, getAUserById, addUser, updateAUserById, deleteAUserById, userLogin, userLogout, userProfile, checkUser } = require('../../controllers/userControllers.js');
const authUser = require('../middlewares/authUser.js');
const authAdmin = require('../middlewares/authAdmin.js');
const userRouter = express.Router();



userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getAUserById)
userRouter.post('/create', addUser)
userRouter.post('/login', userLogin)
userRouter.post('/logout', userLogout, authUser)
userRouter.post('/profile/:userid', userProfile, authUser)
userRouter.post('/check-user', checkUser, authUser)
userRouter.patch('/:userId', updateAUserById, authAdmin, authUser)
userRouter.delete('/:userId', deleteAUserById, authAdmin, authUser)
module.exports = userRouter