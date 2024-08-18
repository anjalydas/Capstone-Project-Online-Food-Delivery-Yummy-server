const Store = require("../model/storeModel.js");


const getAllStores = async (req, res, next) => {
    try {
        const stores = await Store.find(req.query);
        if (stores.length === 0) {
            return res.status(404).json({ success: false, message: "No stores found" });
        }
        res.json({ success: true, stores });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching stores" });
    }
};


const getStoreById = async (req, res, next) => {
    try {
        const store = await Store.findById(req.params.storeId).exec();
        if (!store) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        res.json({ success: true, store });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid store ID" });
        }
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


const addStore = async (req, res, next) => {
    try {
        const { storeName, address, contactNumber } = req.body;
        if (!storeName || !address || !contactNumber) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const newStore = new Store({ storeName, address, contactNumber });
        await newStore.save();
        res.json({ success: true, message: "Store created successfully", store: newStore });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error adding store" });
    }
};


const updateStoreById = async (req, res, next) => {
    try {
        const { name, address, contactNumber } = req.body;
        const updatedStore = await Store.findByIdAndUpdate(req.params.storeId, { name, address, contactNumber }, { new: true, runValidators: true });
        if (!updatedStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        res.json({ success: true, store: updatedStore });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid store ID" });
        }
        res.status(500).json({ message: error.message || "Error updating store" });
    }
};


const deleteStoreById = async (req, res, next) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.storeId);
        if (!deletedStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        res.json({ success: true, message: "Store deleted successfully" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid store ID" });
        }
        res.status(500).json({ message: error.message || "Error deleting store" });
    }
};

module.exports = { getAllStores, getStoreById, addStore, updateStoreById, deleteStoreById };
