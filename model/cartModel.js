const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    name: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true,
    },
        dishName: {
            type: mongoose.ObjectId,
            ref: 'Item',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
});

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart