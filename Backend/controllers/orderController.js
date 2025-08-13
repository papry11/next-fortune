import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import GuestUser from '../models/guestModel.js'; // ✅ Corrected model name
import { v4 as uuidv4 } from "uuid";

// ✅ Place Guest Order
const placeGuestOrder = async (req, res) => {
  try {
    const { fullName, phone, fullAddress, items, amount } = req.body;

    if (!fullName || !phone || !fullAddress || !items || !amount) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Backend এ product price আবার গণনা করো
    const totalProductPrice = items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    // delivery charge বের করো
    const deliveryCharge = amount - totalProductPrice;

    // ফাইনাল এমাউন্ট হিসাব
    const finalAmount = totalProductPrice + deliveryCharge;

    // Guest user তৈরি
    const guestUser = await GuestUser.create({ fullName, phone, fullAddress });

    const trackingId = uuidv4();

    // Order তৈরি
    const order = await Order.create({
      user: guestUser._id,
      userType: "GuestUser",
      items,
      address: {
        fullName,
        phone,
        fullAddress
      },
      amount: finalAmount,
      trackingId
    });

    res.status(201).json({ success: true, trackingId });
  } catch (error) {
    console.error("Guest Order Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Track Guest Order
const trackOrder = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const order = await Order.findOne({ trackingId }).populate("user");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Place Authenticated User Order
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount } = req.body;

    // Check if order items exist
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in the order" });
    }

    const userId = req.userId || null;

    const orderData = {
      user: userId,
      userType: userId ? "User" : "GuestUser",
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear cart for logged-in user
    if (userId) {
      await User.findByIdAndUpdate(userId, { cartData: {} });
    }

    res.status(201).json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ⛔ Placeholder for Bkash (You can complete later)
const placeOrderBkash = async (req, res) => {
  res.status(501).json({ success: false, message: "Bkash payment not implemented yet" });
};

// ✅ Get all orders (Admin)
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("All Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get orders for logged-in user
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update order status (Admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeGuestOrder,
  trackOrder,
  placeOrder,
  placeOrderBkash,
  allOrders,
  userOrders,
  updateStatus
};
