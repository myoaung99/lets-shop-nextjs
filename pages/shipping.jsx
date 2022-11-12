import React from "react";
import ShippingWizard from "../components/LV2/Shipping/ShippingWizard";

const ShippingScreen = () => {
  return (
    <div>
      <ShippingWizard activeStep={1} />
    </div>
  );
};

//* ===== `protected` props can be access from _app.js Component object ==========
ShippingScreen.protected = true;
export default ShippingScreen;
