import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');


  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh border-t]">
      {/* left side--------------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="gap-3">
          <label className="mx-2">Name</label>
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="text"
            placeholder="Enter Your Name"
          />
          <label className="mx-2">Phone Number</label>
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="number"
            placeholder="Enter Your Number"
          />
          <label className="mx-2">Address</label>
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
            type="text"
            placeholder="Enter Your Address"
          />
          <div className="flex flex-col">
            <label htmlFor="shippingArea" className="mx-2">
              Shipping Area
            </label>
            <select
              id="shippingArea"
              name="shippingArea"
              className="border text-gray-500 border-gray-300 rounded py-1.5 px-3.5 w-full m-2"
              required
            >
              <option value="">Select Delivery Area</option>
              <option value="Dhaka">Inside Dhaka</option>
              <option value="Chittagong">Outide Dhaka</option>
            </select>
          </div>
        </div>
      </div>
      {/* right side--------------------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* payment method selection ----------------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white text-sm my-8 px-8 py-3'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
