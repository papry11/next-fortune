import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '৳';
  const [userLocation, setUserLocation] = useState('dhaka'); 
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    
    
    
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('সাইজ সিলেক্ট করুন');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            if (itemInfo && itemInfo.price) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getDeliveryFee = () => {
    if (userLocation.toLowerCase() === 'dhaka') {
      return 80;
    } else {
      return 150;
    }
  };

  const value = {
    products,
    currency,
    getDeliveryFee,
    userLocation,
    setUserLocation,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;