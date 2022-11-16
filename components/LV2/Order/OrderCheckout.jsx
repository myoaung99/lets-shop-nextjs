import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../../Store/context";
import { getError } from "../../../utils/handleError";

const roundToTwo = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

const getTotalPrice = (items) => {
  return roundToTwo(
    items.reduce(
      (total, item) => (total = total + item.quantity * item.price),
      0
    )
  );
};

const OrderCheckout = () => {
  const cartCtx = useContext(Context);
  const {
    cart: { cartItems },
    paymentMethod,
    shippingAddress,
  } = cartCtx;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const totalPrice = getTotalPrice(cartItems);
  const taxPrice = roundToTwo(totalPrice * 0.15);
  const shippingPrice = totalPrice > 200 ? 0 : 15;
  const totalCost = roundToTwo(totalPrice + taxPrice + shippingPrice);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        taxPrice,
        shippingPrice,
        totalCost,
      });
      setLoading(false);
      cartCtx.resetCart();
      router.push(`/order/${data.id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err), {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="card p-5 h-fit">
      <h2>Order Summary</h2>
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
          <button onClick={placeOrderHandler} className="primary-button w-full">
            Place Order
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OrderCheckout;
