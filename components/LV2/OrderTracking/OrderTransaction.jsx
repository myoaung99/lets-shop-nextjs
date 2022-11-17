import { useRouter } from "next/router";
import React from "react";

const OrderTransaction = (props) => {
  const { totalPrice, taxPrice, shippingPrice, totalCost } = props;
  const router = useRouter();

  const backToHomeHandler = () => {
    router.push("/");
  };

  return (
    <div className="card p-5 h-fit">
      <h2 className="text-lg font-semibold mb-1">Order Summary</h2>
      <ul>
        <li>
          <div className="flex justify-between pb-3">
            <p>Items Price :</p>
            <p>${totalPrice}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between pb-3">
            <p>Tax :</p>
            <p>${taxPrice}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between pb-3">
            <p>Shipping :</p>
            <p>${shippingPrice}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between pb-3">
            <p>Total price :</p>
            <p>${totalCost}</p>
          </div>
        </li>
        <li>
          <button onClick={backToHomeHandler} className="primary-button w-full">
            Back to Shopping
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OrderTransaction;
