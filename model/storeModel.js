const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema
    ({ storeName: { type: String, required: true },
        address:String,
        contactNumber: String,
        image: String,
        rating: Number,
        description: String,
        dishName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
        
    });
   

const Store = mongoose.model('Store', storeSchema)
module.exports = Store