import Image from "next/image";
import React from "react";

const convertToStringAddress = (address) => {
  const stringAddress = `${address?.fullname}, ${address?.postal}, ${address?.address}, ${address?.city} ${address?.country}`;
  return stringAddress;
};

const OrderInfo = (props) => {
  const {
    shippingAddress,
    paymentMethod,
    orderedItems,
    isDelivered,
    isPaid,
    deliveredAt,
    paidAt,
  } = props;
  return (
    <div className="space-y-4 ">
      <div className="card h-fit p-4">
        <h4 className="text-lg font-semibold">Shipping Address</h4>
        <p>{convertToStringAddress(shippingAddress)}</p>
        <div
          className={`p-2 rounded mt-2 border ${
            isDelivered ? "success-box" : "alert-box"
          }`}
        >
          <p>{isDelivered ? `Delivered at ${deliveredAt}` : "Not Delivered"}</p>
        </div>
      </div>

      <div className="card h-fit p-4">
        <h4 className="text-lg font-semibold">Payment Method</h4>
        <p>{paymentMethod}</p>
        <div
          className={`p-2 rounded mt-2 border ${
            isPaid ? "success-box" : "alert-box"
          }`}
        >
          <p>{isPaid ? `Paid at ${paidAt}` : "Not Paid"}</p>
        </div>
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
            {orderedItems.map((item) => (
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
                  <p>${item.quantity * item.price}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderInfo;
