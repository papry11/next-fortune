import React, { useContext } from 'react';
import { AuthContext } from '../context/ShopContext';
import GuestCheckout from '../components/guestCheckout';
import UserCheckout from '../components/guestCheckout'; 

const Checkout = ({ cartItems, totalAmount }) => {
  const { aToken } = useContext(AuthContext); // or your login context

  return (
    <div className="checkout-container">
      {aToken ? (
        <UserCheckout cartItems={cartItems} totalAmount={totalAmount} />
      ) : (
        <GuestCheckout cartItems={cartItems} totalAmount={totalAmount} />
      )}
    </div>
  );
};

export default Checkout;
