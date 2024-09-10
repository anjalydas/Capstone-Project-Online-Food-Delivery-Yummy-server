const mongoose = require('mongoose');
const foodItemSchema = new mongoose.Schema
    ({ dishName: String,
        image: String,
        storeName: {type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            required: true
        },
        image: String,
        price: Number,
        rating: Number,
        description: String,
        category: {
            type: String,
            enum: ["veg", "non-veg"],
        },
    });
   

const FoodItem = mongoose.model('Item', foodItemSchema)
module.exports = FoodItem