const Cart = require("../model/cartModel.js");
const Payment = require("../model/paymentModel.js");
const User = require("../model/userModel.js");
const crypto = require('crypto');
const stripe = require("stripe")(process.env.Stripe_Private_Api_Key);



const createPayment = async (req, res, next) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity || 1,
        })),
        mode: "payment",
        success_url: `${process.env.ALLOWED_ORIGIN}/payment/success`,
        cancel_url: `${process.env.ALLOWED_ORIGIN}/payment/cancel`,
        metadata: {
            userId: req.userId // Add userId to metadata if available
        },
    });
    
        res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
const clearCart = async (userId) => {
  try {
    await Cart.deleteMany({ userId }); // assuming `Cart` is your cart model and it has a `userId` field
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Could not clear cart");
  }
};


const paymentStatus = async (req, res) => {
    try {
        const sessionId = req.query.sessionId; // Get the session_id from query parameters
        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) {
          return res.status(404).json({ message: 'Session not found' });
      }
        const userId = session.metadata.userId || req.body.userId; // Fallback if not in metadata


        await clearCart(userId); 

        res.json({
            message: "Successfully fetched order details and cleared cart",
            success: true,
            data: session
        });
    } catch (error) {
        console.error('Error retrieving payment status:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


module.exports = {createPayment, paymentStatus}
