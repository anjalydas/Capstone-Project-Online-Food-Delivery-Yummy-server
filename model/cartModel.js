const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    foodItems: [{
        name: {
            type: String,
            required: true,
        },
        dishName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,  // Ensure there's a default quantity
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
    }],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
