const Cart = require("../model/cartModel.js");
const User = require("../model/userModel.js");
const { checkUser } = require("./userControllers.js");


const getAllCartItems = async (req, res, next) => {
    try {
        const cartItems = await User.find({ Cart })
        if (cartItems.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }
        res.json({ success: true, cartItems });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error fetching cart items" });
    }
};

const addItemToCart = async (req, res) => {
    try {
        const { name, dishName, quantity, totalPrice, shippingAddress } = req.body;

        if ( !dishName || !quantity || !shippingAddress) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let cart = await Cart.findOne({ 'foodItems.dishName': dishName });

        if (!cart) {
            cart = new Cart({
              foodItems: [{ name, dishName, quantity, totalPrice, shippingAddress }],
            });
        } else {
            const existingItem = cart.foodItems.find(item => item.dishName === dishName);

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice += totalPrice; // Adjust totalPrice if needed
            } else {
                cart.foodItems.push({ name, dishName, quantity, totalPrice, shippingAddress });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding item to cart", error: error.message });
    }
};


const updateCartItemQuantity = async (req, res, next) => {
  try {
      const { dishName, quantity, totalPrice, shippingAddress } = req.body;
      const updatedCartItem = await Cart.findByIdAndUpdate(req.params.cartId, { dishName, quantity, totalPrice, shippingAddress }, { new: true, runValidators: true });
        
      if (!dishName || !quantity) {
          return res.status(400).json({ success: false, message: "item and quantity are required" });
      }
      
      if (!updatedCartItem) {
        return res.status(404).json({ success: false, message: "Food item not found" });
    }
      

      await updatedCartItem.save();
      res.json({ success: true, message: "Cart item quantity updated", updatedCartItem });
  } catch (error) {
      res.status(500).json({ message: error.message || "Error updating cart item quantity" });
  }
};

const removeCartItem = async (req, res, next) => {
    try {
        const { dishName } = req.body;
        if (!dishName) {
            return res.status(400).json({ success: false, message: "Dish name is required" });
        }
  
        const cart = await Cart.findOne({ dishName });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
 
        if (!cart.items) {
            cart.items = [];
        }
  
        cart.items = cart.items.filter(item => item.dishName !== dishName);
  
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




