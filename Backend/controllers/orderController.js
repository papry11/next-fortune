
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from "../models/productModels.js";
import GuestUser from '../models/guestModel.js';
import { v4 as uuidv4 } from "uuid";

// ✅ Place Guest Order
const placeGuestOrder = async (req, res) => {
  try {
    const { fullName, phone, fullAddress, items, amount } = req.body;

    if (!fullName || !phone || !fullAddress || !items || !amount) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Calculate total
    const totalProductPrice = items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    const deliveryCharge = amount - totalProductPrice;
    const finalAmount = totalProductPrice + deliveryCharge;

    // Create Guest User
    const guestUser = await GuestUser.create({ fullName, phone, fullAddress });

    const trackingId = uuidv4();

    // ✅ Map items with product image also
    const orderItems = await Promise.all(
  items.map(async (item) => {
    const product = await Product.findById(item.productId).select("image name price");

    return {
      product: item.productId,
      name: product ? product.name : item.name,
      price: product ? product.price : item.price,
      quantity: item.quantity,
      size: item.size,
      image: product ? product.image[0] : null   // ✅ ensure image saved
    };
  })
);

    // Create Order
    const order = await Order.create({
      user: guestUser._id,
      userType: "GuestUser",
      items: orderItems,
      address: {
        fullName,
        phone,
        fullAddress,
      },
      amount: finalAmount,
      trackingId,
      paymentMethod: "COD",
      payment: false,
    });

    

    res.status(201).json({ success: true, trackingId });
  } catch (error) {
    console.error("Guest Order Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



//✅ Place Guest Order
// const placeGuestOrder = async (req, res) => {
//   try {
//     const { fullName, phone, fullAddress, items, amount } = req.body;

//     if (!fullName || !phone || !fullAddress || !items || !amount) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Calculate total
//     const totalProductPrice = items.reduce(
//       (sum, item) => sum + (item.price * item.quantity),
//       0
//     );

//     const deliveryCharge = amount - totalProductPrice;
//     const finalAmount = totalProductPrice + deliveryCharge;

//     // Create Guest User
//     const guestUser = await GuestUser.create({ fullName, phone, fullAddress });

//     const trackingId = uuidv4();

//     // ✅ Map items to include ObjectId & size
//     const orderItems = items.map(item => ({
//       product: item.productId,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       size: item.size
//     }));

//     // Create Order
//     const order = await Order.create({
//       user: guestUser._id,
//       userType: "GuestUser",
//       items: orderItems,
//       address: {
//         fullName,
//         phone,
//         fullAddress
//       },
//       amount: finalAmount,
//       trackingId
//     });

//     res.status(201).json({ success: true, trackingId });
//   } catch (error) {
//     console.error("Guest Order Error:", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// ✅ Track Guest Order
const trackOrder = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const order = await Order.findOne({ trackingId })
      .populate("user")
      .populate("items.product", "name price image size");

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

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in the order" });
    }

    const userId = req.userId || null;

    const orderItems = items.map(item => ({
      product: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size
    }));

    const orderData = {
      user: userId,
      userType: userId ? "User" : "GuestUser",
      items: orderItems,
      address,
      amount,
      paymentMethod: "COD",
      payment: false
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    if (userId) {
      await User.findByIdAndUpdate(userId, { cartData: {} });
    }

    res.status(201).json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Get all orders (Admin)
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user")
      .populate("items.product", "name price image size");

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

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price image size");

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
  allOrders,
  userOrders,
  updateStatus
};
