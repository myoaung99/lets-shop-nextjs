import React from "react";
import OrderTrackingWizard from "../../components/LV2/OrderTracking";
import Order from "../../model/Order";
import db from "../../utils/db";

const OrderTrackingScreen = (props) => {
  if (props.error) {
    return (
      <h1 className="text-black">
        {props.error || "Error! No order was found."}
      </h1>
    );
  }
  return <OrderTrackingWizard orderDetail={props.orderDetail} />;
};

OrderTrackingScreen.protected = true;
export default OrderTrackingScreen;

export const getServerSideProps = async (context) => {
  const { orderId } = context.params;
  let orderDetail;
  await db.connect();

  //? ========== CHECK THE orderId IS VALID OR NOT
  try {
    orderDetail = await Order.findOne({ _id: orderId }).lean();
  } catch (err) {
    return {
      props: { error: "Order Not Found!" },
    };
  }
  await db.disconnect();

  //? ======== CHECK IF THE ORDER DETAIL IS EMPTY ========
  if (!orderDetail) {
    return {
      props: { error: "Order Not Found!" },
    };
  }

  return {
    props: { orderDetail: db.convertDocToObj(orderDetail) },
  };
};
