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
              unit_amount: item.price * 100, // price in smallest currency unit (paise)
            },
            quantity: item.quantity|| 1,
          })),
        
            mode: "payment",
            success_url: `https://capstone-project-online-food-delivery-yummy-client.vercel.app/success`, // Pass session_id to the success URL
            cancel_url: `https://capstone-project-online-food-delivery-yummy-client.vercel.app/cancel`,
        });

        res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const paymentStatus = async (req, res) => {
    try {
        const sessionId = req.query.session_id; // Get the session_id from query parameters
        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Assuming user ID is stored in the session or passed in some way
        const userId = session.metadata.userId; // Change this according to how you store user ID

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
