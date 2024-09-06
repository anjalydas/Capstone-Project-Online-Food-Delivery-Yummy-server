const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'], // You can add more methods as needed
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

paymentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
