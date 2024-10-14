const Order = require("../model/orderModel.js");
const Cart = require("../model/cartModel.js");
const User = require("../model/userModel.js");

// Fetch all orders for a user
const getAllOrders = async (req, res) => {
    try {
        const user = req.body;

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ success: false, message: "User is not found" });
        }

        console.log("Fetching all orders for user:", user._id);  // Log the user ID

        // Fetch all orders for the user
        const orders = await Order.find(user)
            .populate("user", "name email")
            .populate("cartId");

        console.log("Orders found:", orders);  // Log what is returned

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found." });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const createOrder = async (req, res) => {
    const { user, cartId, foodItems, shippingAddress, paymentMethod, totalAmount } = req.body;
  
    // Ensure all required fields are provided
    if (!user || !cartId || !foodItems || !shippingAddress || !paymentMethod || !totalAmount) {
      return res.status(400).json({ success: false, message: "All required fields must be provided." });
    }
  
    try {
      const order = new Order({
        user,
        cartId,
        foodItems,
        shippingAddress,
        paymentMethod,
        totalAmount,
        orderStatus: req.body.orderStatus || "Pending", // Defaults to Pending if not provided
      });
  
      await order.save();
      console.log("Order created successfully:", order);
      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Error creating order", error: error.message });
    }
  };
  
const getUserOrders = async (req, res) => {
    try {
        
        const user = req.body;
        const orders = await Order.find(user).populate('cartId');

        console.log("Orders found for user:", orders);  // Log what is returned
        
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found." });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};


// Update order status (for admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        if (!orderStatus) {
            return res.status(400).json({ success: false, message: "Order status is required" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true, runValidators: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
    }
};

// Remove an order (for admin or user)
const removeOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        await order.remove();
        res.status(200).json({ success: true, message: "Order removed successfully" });
    } catch (error) {
        console.error("Error removing order:", error);
        res.status(500).json({ success: false, message: "Error removing order", error: error.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    getUserOrders,
    updateOrderStatus,
    removeOrder
};
