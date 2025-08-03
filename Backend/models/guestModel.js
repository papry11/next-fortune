import mongoose from "mongoose";

const guestUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
}, { timestamps: true });

export default mongoose.model("GuestUser", guestUserSchema);
