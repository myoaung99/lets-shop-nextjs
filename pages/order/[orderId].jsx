import React from "react";
import OrderTrackingWizard from "../../components/LV2/OrderTracking";
import Order from "../../model/Order";
import db from "../../utils/db";

const OrderTrackingScreen = ({ orderDetail }) => {
  return <OrderTrackingWizard orderDetail={orderDetail} />;
};

OrderTrackingScreen.protected = true;
export default OrderTrackingScreen;

export const getServerSideProps = async (context) => {
  const { orderId } = context.params;
  await db.connect();
  const orderDetail = await Order.findOne({ _id: orderId }).lean();
  await db.disconnect();

  return {
    props: { orderDetail: db.convertDocToObj(orderDetail) },
  };
};
