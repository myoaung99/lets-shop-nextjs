import React from "react";
import ShippingWizard from "../components/LV2/Shipping/ShippingWizard";

const ShippingScreen = () => {
  return (
    <div>
      <ShippingWizard activeStep={1} />
    </div>
  );
};

export default ShippingScreen;
