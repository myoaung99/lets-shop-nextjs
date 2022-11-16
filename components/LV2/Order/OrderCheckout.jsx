import Link from "next/link";
import React, { useContext } from "react";
import { Context } from "../../../Store/context";

const OrderCheckout = () => {
  const cartCtx = useContext(Context);
  const { itemCount, totalPrice } = cartCtx;

  return (
    <div className="card p-5 h-fit">
      <h2>Order Summary</h2>
      <ul>
        <li>
          <div className="flex justify-between pb-3">
            <p>Items :</p>
            <p>{itemCount}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between pb-3">
            <p>Tax :</p>
            <p>{itemCount}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between pb-3">
            <p>Shipping :</p>
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
          <Link href="/submit-order">
            <button className="primary-button w-full">Place Order</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OrderCheckout;
