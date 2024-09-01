const FoodItem = require("../model/FoodItemModel.js");



const getAllFoodItems = async (req, res, next) => {
    try {
        const foodItems = await FoodItem.find(req.query);
        if (foodItems.length === 0) {
            return res.status(404).json({ success: false, message: "No food items found" });
        }
        res.json({ success: true, foodItems });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching food items" });
    }
};


const getFoodItemById = async (req, res, next) => {
    try {
        const foodItem = await FoodItem.findById(req.params.foodItemId).exec();
        if (!foodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.json({ success: true, foodItem });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid food item ID" });
        }
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


const addFoodItem = async (req, res, next) => {
    try {
        
        const { dishName, image,  price, description, category, storeName } = req.body;
        if (!dishName || !price || !description || !category || !storeName) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const newFoodItem = new FoodItem({ dishName, image, price, description, category, storeName });
        await newFoodItem.save();
        res.json({ success: true, message: "Food item created successfully", foodItem: newFoodItem });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error adding food item" });
    }
};


const updateFoodItemById = async (req, res, next) => {
    try {
        const { dishName,image, price, description, category } = req.body;
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.foodItemId, { dishName,image, price, description, category }, { new: true, runValidators: true });
        if (!updatedFoodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.json({ success: true, foodItem: updatedFoodItem });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid food item ID" });
        }
        res.status(500).json({ message: error.message || "Error updating food item" });
    }
};


const deleteFoodItemById = async (req, res, next) => {
    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(req.params.foodItemId);
        if (!deletedFoodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.json({ success: true, message: "Food item deleted successfully" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid food item ID" });
        }
        res.status(500).json({ message: error.message || "Error deleting food item" });
    }
};

module.exports = { getAllFoodItems, getFoodItemById, addFoodItem, updateFoodItemById, deleteFoodItemById };
