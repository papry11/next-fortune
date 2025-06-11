import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, getCartAmount, getDeliveryFee } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"TOTAL"} text2={"AMOUNT"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-l ">
        <div className="flex justify-between">
          <p>Product Price</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Charge</p>
          <p>
            {currency}
            {getDeliveryFee()}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total </b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + getDeliveryFee()}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;