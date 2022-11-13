import React from "react";
import ShippingAddress from "./ShippingAddress";

const SHIPPING_STEPS = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

const ShippingWizard = ({ activeStep }) => {
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
      <ShippingAddress />
    </>
  );
};

export default ShippingWizard;
