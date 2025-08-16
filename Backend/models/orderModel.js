
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: "userType"
//   },
//   userType: {
//     type: String,
//     enum: ["User", "GuestUser"]
//   },
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // ✅ ObjectId reference
//       name: String,
//       price: Number,
//       quantity: Number,
//       size: String
//     }
//   ],
//   address: {
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     fullAddress: { type: String, required: true }
//   },
//   amount: Number,
//   paymentMethod: { type: String, default: "COD" }, // ✅ Added
//   payment: { type: Boolean, default: false }, // ✅ Added
//   status: {
//     type: String,
//     default: "Pending"
//   },
//   trackingId: String
// }, { timestamps: true }); // ✅ createdAt & updatedAt added

// export default mongoose.model("Order", orderSchema);


// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "userType"
  },
  userType: {
    type: String,
    enum: ["User", "GuestUser"]
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
      size: String,
      image: String   // ✅ image field add korlam
    }
  ],
  address: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    fullAddress: { type: String, required: true }
  },
  amount: Number,
  paymentMethod: { type: String, default: "COD" },
  payment: { type: Boolean, default: false },
  status: { type: String, default: "Pending" },
  trackingId: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
