import dynamic from "next/dynamic";
import React, from "react";
import OrderWizard from "../components/LV2/Order/OrderWizard";

const PlaceOrderScreen = () => {
 
  return <OrderWizard activeStep={3} />;
};

PlaceOrderScreen.protected = true;
export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });
