// import mongoose from 'mongoose'

// const orderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     items: { type: Array, required: true },
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, required: true , default:'Order Placed' },
//     paymentMethod: { type: String, required: true },
//     payment: { type: Boolean, required: true, default: false },
//     date: { type: Number, required:true },

// })

// const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
// export default orderModel;

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: 'userType'
//   },
//   userType: {
//     type: String,
//     enum: ['User', 'GuestUser']
//   },
//   items: [
//     {
//       productId: String,
//       name: String,
//       price: Number,
//       quantity: Number
//     }
//   ],
//   address: {
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     fullAddress: { type: String, required: true }
//   },
//   amount: Number,
//   status: {
//     type: String,
//     default: "Pending"
//   },
//   trackingId: String
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);


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
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  address: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    fullAddress: { type: String, required: true }
  },
  amount: Number,
  status: {
    type: String,
    default: "Pending"
  },
  trackingId: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
