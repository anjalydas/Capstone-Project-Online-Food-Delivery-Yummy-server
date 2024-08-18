const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema
    ({   userId: {
        type: mongoose.ObjectId,
            ref: 'User',
        required: true,
    },
    foodItemId: 
        {
            type: mongoose.ObjectId,
            ref: 'Item'
        },

    TotalPrice: {
        type: Number,
        required: true,
    },
       
       quantity:  Number,
       ShippingAddress: String,
    });
   

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart