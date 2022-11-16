import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Context } from "../../../Store/context";

const convertToStringAddress = (address) => {
  const stringAddress = `${address?.fullname}, ${address?.postal}, ${address?.address}, ${address?.city} ${address?.country}`;
  return stringAddress;
};

const OrderInfo = () => {
  const cartCtx = useContext(Context);

  return (
    <div className="space-y-4 ">
      <div className="card h-fit p-4">
        <h4 className="text-lg font-semibold">Shipping Address</h4>
        <p>{convertToStringAddress(cartCtx.shippingAddress)}</p>
        <Link
          href="/shipping"
          className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-800"
        >
          Edit
        </Link>
      </div>

      <div className="card h-fit p-4">
        <h4 className="text-lg font-semibold">Payment Method</h4>
        <p>{cartCtx.paymentMethod}</p>
        <Link
          href="/payment"
          className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-800"
        >
          Edit
        </Link>
      </div>
      <div className="card h-fit p-4 ">
        <h4 className="text-lg font-semibold">Order Items</h4>
        <table className="table-auto w-full mt-5">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {cartCtx.cart.cartItems.map((item) => (
              <tr key={item.slug}>
                <td className="p-3 flex items-center ">
                  <div className="w-20">
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      alt={item.name}
                    ></Image>
                  </div>

                  <h3>{item.name}</h3>
                </td>
                <td className="p-3 text-center ">
                  <p>{item.quantity}</p>
                </td>
                <td className="p-3 text-center">${item.price}</td>
                <td className="p-3 text-center">
                  <p>{item.quantity * item.price}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          href="/cart"
          className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-800 mt-3"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default OrderInfo;
