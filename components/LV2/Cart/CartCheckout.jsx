import React from "react";

const CartCheckout = ({ itemCount, totalPrice }) => {
  return (
    <div className="card p-5 h-fit">
      <ul>
        <li>
          <div className="flex justify-between pb-3">
            <p>Item in cart :</p>
            <p>{itemCount}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between pb-3">
            <p>Total price :</p>
            <p>{totalPrice}</p>
          </div>
        </li>
        <li>
          <button className="primary-button w-full">Checkout</button>
        </li>
      </ul>
    </div>
  );
};

export default CartCheckout;
