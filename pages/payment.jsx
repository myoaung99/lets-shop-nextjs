import React from "react";
import PaymentWizard from "../components/LV2/Payment/PaymentWizard";

const PaymentScreen = () => {
  return <PaymentWizard activeStep={2} />;
};

PaymentScreen.protected = true;
export default PaymentScreen;
