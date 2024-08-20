const Order = require("../model/orderModel.js");


const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find(req.query).populate('user').populate('items.foodItem');
    res.json(orders);
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
};


const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user').populate('items.foodItem').exec();
    if (!order) {
      return res.status(404).send('Order Not Found');
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(404).send('Order Not Found');
  }
};


const addOrder = async (req, res, next) => {
  try {
      console.log(req.body)
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send('Error adding order');
  }
};


const updateOrderById = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).send('Order Not Found');
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).send('Error updating order');
  }
};


const deleteOrderById = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).send('Order Not Found');
    }
    res.status(200).send('Order deleted');
  } catch (error) {
    res.status(500).send('Error deleting order');
  }
};

module.exports = { getAllOrders, getOrderById, addOrder, updateOrderById, deleteOrderById };
