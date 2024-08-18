const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema
    ({ storeName: String,
        address:String,
        contactNumber: String,
        image: String,
        rating: Number,
        description: String,
        dish: Array
        
    });
   

const Store = mongoose.model('Store', storeSchema)
module.exports = Store