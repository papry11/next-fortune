import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GuestCheckout = ({ cartItems, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/orders/place-guest", {
        ...formData,
        items: cartItems,
        amount: totalAmount,
        paymentMethod: 'COD'
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <form onSubmit={placeOrder} className="guest-checkout-form">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <textarea name="address" placeholder="Shipping Address" onChange={handleChange} required />
      <button type="submit">Place Guest Order</button>
    </form>
  );
};

export default GuestCheckout;
