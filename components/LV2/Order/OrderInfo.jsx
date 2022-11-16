import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Context } from "../../../Store/context";
import CartTable from "../Cart/CartTable";

const convertToStringAddress = (address) => {
  const stringAddress = `${address?.fullname}, ${address?.postal}, ${address?.address}, ${address?.city} ${address?.country}`;
  return stringAddress;
};

const OrderInfo = () => {
  const cartCtx = useContext(Context);
  const router = useRouter();

  return (
    <div className="space-y-4 ">
      <div className="card h-fit p-4">
        <h4 className="text-lg font-semibold">Shipping Address</h4>
        <p>{convertToStringAddress(cartCtx.shippingAddress)}</p>
        <button
          onClick={() => router.push("/shipping")}
          className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-800"
        >
          Edit
        </button>
      </div>

      <div className="card h-fit p-4">
        <h4 className="text-lg font-semibold">Payment Method</h4>
        <p>{cartCtx.paymentMethod}</p>
        <button className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-800">
          Edit
        </button>
      </div>
      <div className="card h-fit p-4 ">
        <h4 className="text-lg font-semibold">Order Items</h4>
        <CartTable items={cartCtx.cart.cartItems} />
      </div>
    </div>
  );
};

export default OrderInfo;
