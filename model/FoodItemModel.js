const mongoose = require('mongoose');
const foodItemSchema = new mongoose.Schema
    ({ dishName: String,
        storeName: {
            type: mongoose.ObjectId,
            ref: 'Store'
        },
        image: String,
        price: Number,
        rating: Number,
        description: String,
        
    });
   

const FoodItem = mongoose.model('Item', foodItemSchema)
module.exports = FoodItem