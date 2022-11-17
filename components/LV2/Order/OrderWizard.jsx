import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../../../Store/context";
import OrderCheckout from "./OrderCheckout";
import OrderInfo from "./OrderInfo";

const SHIPPING_STEPS = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

const OrderWizard = ({ activeStep = 3 }) => {
  const cartCtx = useContext(Context);
  const router = useRouter();

  const {
    cart: { cartItems },
    paymentMethod,
  } = cartCtx;

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  if (cartItems.length === 0) {
    return (
      <div className="mt-2 text-sm text-black ">
        <span>No item in cart to order. </span>
        <Link href="/" className="underline">
          Why not get something?
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap text-black">
        {SHIPPING_STEPS.map((step, index) => (
          <div
            key={index}
            className={`flex-1 min-w-[300px] text-center border-b-2 pb-1 transition duration-300 ${
              index <= activeStep
                ? "border-indigo-500 text-indigo-500"
                : "border-gray-200 text-gray-400"
            } `}
          >
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h1 className="text-lg font-semibold mb-4 text-black">Place Order</h1>

      <div className="grid md:grid-cols-4 gap-4 text-black">
        <div className="md:col-span-3 ">
          <OrderInfo />
        </div>

        <OrderCheckout />
      </div>
    </>
  );
};

export default OrderWizard;
