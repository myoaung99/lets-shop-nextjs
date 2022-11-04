import Image from "next/image";
import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Context } from "../../../Store/context";

const CartTable = ({ items }) => {
  const cartCtx = useContext(Context);

  const removeItemHandler = (slug) => {
    cartCtx.removeFromCart(slug);
  };

  return (
    <table class="table-auto border-separate border-spacing-2 w-full mt-5">
      <thead>
        <tr>
          <th className="text-left">Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.slug}>
            <td className="flex items-center">
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
            <td className="text-center">{item.quantity} </td>
            <td className="text-center">${item.price}</td>
            <td>
              <XCircleIcon
                className="mx-auto text-red-500 cursor-pointer hover:text-red-600 active:text-red-700"
                width={25}
                height={25}
                onClick={() => removeItemHandler(item.slug)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
