const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema
    ({   userId: {
        type: String,
        required: true,
    },
    dishes: 
        {
            type: mongoose.ObjectId,
            ref: 'Dish'
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