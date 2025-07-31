import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount } = req.body;

    // Get userId from auth middleware (set as req.userId)
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear cart after successful order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// place order for guest

export const placeGuestOrder = async (req, res) => {
  try {
    const { name, email, phone, address, items, amount, paymentMethod } = req.body;

    if (!name || !email || !address || !items || !amount) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ name, email, phone });
    }

    const order = await orderModel.create({
      user: user._id,
      items,
      amount,
      address,
      paymentMethod,
    });

    res.status(201).json({ success: true, message: "Order placed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// placing order using Bkash method
const placeOrderBkash = async (req, res) => {



};

//  get all orders data for admin panel
const allOrders = async (req, res) => {
  
  try {
    const orders = await orderModel.find({})
    res.json({success:true,orders})
  } catch (error) {
     console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }


};

// get orders for a user (frontend)
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });

  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// update order status for admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status Updates' })
    
    
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }


};



export {
  placeOrder,
  placeOrderBkash,
  allOrders,
  userOrders,
  updateStatus
};

