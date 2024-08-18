const Cart = require("../model/cartModel.js");


const getAllCartItems = async (req, res, next) => {
    try {
        const cartItems = await Cart.find({ userId: req.user.id }).populate('foodItems');
        if (cartItems.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }
        res.json({ success: true, cartItems });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching cart items" });
    }
};


const addItemToCart = async (req, res, next) => {
    try {
        console.log(req.user);
        const { foodItem, quantity } = req.body;
        if (!foodItem || !quantity) {
            return res.status(400).json({ success: false, message: "Food item and quantity are required" });
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            cart = new Cart({ userId: req.user._id, foodItems: [] });
        }

        const existingItem = cart.foodItemId.find(item => item.foodItem.toString() === foodItem);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.foodItemId.push({ foodItem, quantity });
        }

        await cart.save();
        res.json({ success: true, message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error adding item to cart" });
    }
};

const updateCartItemQuantity = async (req, res, next) => {
  try {
      const { dishNameId, quantity } = req.body;
      if (!dishNameId || !quantity) {
          return res.status(400).json({ success: false, message: "item and quantity are required" });
      }

      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart) {
          return res.status(404).json({ success: false, message: "Cart not found" });
      }

      const item = cart.foodItems.find(item => item.foodItemId.toString() === foodItemId);
      if (!item) {
          return res.status(404).json({ success: false, message: "Item not found in cart" });
      }

      item.quantity = quantity;

      await cart.save();
      res.json({ success: true, message: "Cart item quantity updated", cart });
  } catch (error) {
      res.status(500).json({ message: error.message || "Error updating cart item quantity" });
  }
};

const removeCartItem = async (req, res, next) => {
  try {
      const { foodItemId } = req.body;
      if (!foodItemId) {
          return res.status(400).json({ success: false, message: "Food item ID is required" });
      }

      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
          return res.status(404).json({ success: false, message: "Cart not found" });
      }

      cart.foodItems = cart.foodItems.filter(item => item.foodItemId.toString() !== foodItemId);

      await cart.save();
      res.json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
      res.status(500).json({ message: error.message || "Error removing item from cart" });
  }
};

module.exports = {
  getAllCartItems,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem
};




