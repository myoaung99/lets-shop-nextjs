import OrderInfo from "./OrderInfo";
import OrderTransaction from "./OrderTransaction";

const OrderTrackingWizard = ({ orderDetail }) => {
  return (
    <>
      <h1 className="text-lg font-semibold mb-4 text-black">
        Order No. {orderDetail._id}
      </h1>

      <div className="grid md:grid-cols-4 gap-4 text-black">
        <div className="md:col-span-3 ">
          <OrderInfo
            shippingAddress={orderDetail.shippingAddress}
            paymentMethod={orderDetail.paymentMethod}
            orderedItems={orderDetail.orderItems}
            isDelivered={orderDetail.isDelivered}
            isPaid={orderDetail.isPaid}
            deliveredAt={orderDetail.deliveredAt}
            paidAt={orderDetail.paidAt}
          />
        </div>

        <OrderTransaction
          totalPrice={orderDetail.itemsPrice}
          taxPrice={orderDetail.taxPrice}
          shippingPrice={orderDetail.shippingPrice}
          totalCost={orderDetail.totalCost}
        />
      </div>
    </>
  );
};

export default OrderTrackingWizard;
