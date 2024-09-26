const express = require('express');
const { createPayment, getPaymentDetails, updatePaymentStatus } = require('../../controllers/paymentControllers.js');
const authUser = require('../middlewares/authUser.js');
const authAdmin = require('../middlewares/authAdmin.js');
const authStoreVender = require('../middlewares/authStoreVender.js');


const paymentRouter = express.Router();


paymentRouter.use(express.json());

paymentRouter.post('/', createPayment, authUser)
module.exports = paymentRouter