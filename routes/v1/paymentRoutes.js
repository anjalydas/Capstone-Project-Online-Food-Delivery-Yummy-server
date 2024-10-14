const express = require('express');
const { createPayment, paymentStatus } = require('../../controllers/paymentControllers.js');
const authUser = require('../middlewares/authUser.js');


const paymentRouter = express.Router();


paymentRouter.use(express.json());

paymentRouter.post('/create-checkout-session', createPayment, authUser)
paymentRouter.post('/session-status', paymentStatus )
paymentRouter.get('/success', paymentStatus)
paymentRouter.get('/cancel', paymentStatus)
module.exports = paymentRouter