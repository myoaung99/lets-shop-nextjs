import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/context";

const SHIPPING_STEPS = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

const PAYMENT_OPTIONS = ["PayPal", "Stripe", "CashOnDelivery"];

const PaymentScreen = ({ activeStep = 2 }) => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  const cartCtx = useContext(Context);
  const { shippingAddress, paymentMethod } = cartCtx;

  function submitHandler(e) {
    e.preventDefault();
    //?===== save selected payment method to cookie ======
    cartCtx.savePayment(selectedPaymentMethod);
    router.push("/order");
  }

  useEffect(() => {
    //?===== shipping address မဖြည့်ထားရင် /shipping ကို ပြန်သွားပါ =======
    if (!shippingAddress) {
      return router.push("/shipping");
    }
    //?===== cookie ထဲက payment method or empty value ကို initial value အဖြစ်ထားပါ ======
    setSelectedPaymentMethod(paymentMethod || " ");
  }, [cartCtx, router, shippingAddress, paymentMethod]);

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
      <div className="mx-auto max-w-screen-md">
        <h2 className="text-black text-xl font-bold text-center">
          Payment Method
        </h2>
        <form className="mt-6">
          {PAYMENT_OPTIONS.map((payment) => (
            <div key={payment} className="block mb-4">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0 mr-2"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label htmlFor={payment} className="text-black">
                {payment}
              </label>
            </div>
          ))}
          <div className="flex justify-between items-center mt-5">
            <button
              className="default-button"
              onClick={() => router.push("/shipping")}
            >
              Back
            </button>
            <button
              type="submit"
              className="primary-button"
              onClick={submitHandler}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
