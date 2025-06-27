import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">All Orders</h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="border rounded p-4 flex flex-col gap-3 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img src={assets.parcel_icon} alt="Parcel" className="w-8 h-8" />
              <div  className='flex justify-between w-full'>
                <div>
                  <p><strong>Order #{index + 1}</strong></p>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.date).toLocaleDateString()}
                </p>
                </div>
                <div>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-sm space-y-1">
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                </p>
              ))}
            </div>
            <p>{order.address.fullName}</p>
            <div>
              <p>{order.address.fullAddress}</p>
            </div>
            <p>{order.address.phone}</p>
            <div className="flex justify-between text-sm text-gray-700">
              <p>Amount: <strong>৳{order.amount}</strong></p>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Payment: <strong>{order.paymentMethod}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
