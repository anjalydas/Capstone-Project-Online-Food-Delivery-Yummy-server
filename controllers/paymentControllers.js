const Cart = require("../model/cartModel.js");
const Payment = require("../model/paymentModel.js");
const User = require("../model/userModel.js");



const createPayment = async (req, res) => {
    try {
        const { email, cartId, paymentMethod, amount } = req.body;

        if (!email || !cartId || !paymentMethod || !amount) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findById(email);
        const cart = await Cart.findById(cartId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const payment = new Payment({
            email,
            cartId,
            paymentMethod,
            amount,
            status: 'Pending', 
        });

        await payment.save();

        res.status(201).json({ success: true, message: "Payment created successfully", payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating payment", error: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        payment.status = status;

        await payment.save();

        res.json({ success: true, message: "Payment status updated", payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating payment status", error: error.message });
    }
};

const getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId).populate('email', 'name email').populate('cartId');

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        res.json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching payment details", error: error.message });
    }
};

module.exports = {
    createPayment,
    updatePaymentStatus,
    getPaymentDetails,
};
