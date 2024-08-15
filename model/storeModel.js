const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema
    ({ storeName: String,
        image: String,
        rating: Number,
        description: String,
        dish: {
            type: mongoose.ObjectId,
            ref: 'Item'
        },
        
    });
   

const Store = mongoose.model('Store', storeSchema)
module.exports = Store