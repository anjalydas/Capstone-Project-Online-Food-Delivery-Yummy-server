const Cart = require("../model/cartModel.js");
const Payment = require("../model/paymentModel.js");
const User = require("../model/userModel.js");
const crypto = require('crypto');

const merchantKey = process.env.PAYU_MERCHANT_KEY;
const merchantSalt = process.env.PAYU_MERCHANT_SALT;
const payuURL = "https://secure.payu.in/_payment";

const createPayment = async (req, res) => {
    try {
        const { email, cartId, paymentMethod, amount } = req.body;

        if (!email || !cartId || !paymentMethod || !amount) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });
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

        const txnid = `${Date.now()}`;
        const productinfo = "Your Product Info";
        const firstname = user.name;
        const phone = user.phone;

        const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${user.email}|||||||||||${merchantSalt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        res.status(201).json({
            success: true,
            message: "Payment created successfully",
            payment,
            payuData: {
                key: merchantKey,
                txnid,
                amount,
                productinfo,
                firstname,
                email: user.email,
                phone,
                surl: "http://your-website.com/payment-success",
                furl: "http://your-website.com/payment-failure",
                hash,
                action: payuURL,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating payment", error: error.message });
    }
};
module.exports = {createPayment}