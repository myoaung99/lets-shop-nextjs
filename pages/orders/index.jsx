import { unstable_getServerSession } from "next-auth";
import moment from "moment/moment";
import Order from "../../model/Order";
import db from "../../utils/db";
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";

const OrderHistory = ({ orderHistory }) => {
  if (orderHistory.length === 0) {
    return <h4 className="text-lg font-semibold">No order to show!</h4>;
  }
  return (
    <div className="text-black">
      <h4 className="text-lg font-semibold">Order History</h4>
      <table className="table-auto w-full mt-5">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order) => (
            <tr key={order._id} className="text-sm">
              <td className="p-3 pl-0">{order._id}</td>
              <td className="p-3 text-center">
                {moment(orderHistory.createdAt).format("dddd, MMMM Do YYYY")}
              </td>
              <td className="p-3 text-center">${order.totalCost}</td>
              <td className="p-3 text-center">
                {order.isPaid ? "Paid" : "Not Paid"}
              </td>
              <td className="p-3 text-center">
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </td>
              <td className="p-3 text-center">
                <Link
                  href={`/orders/${order._id}`}
                  className="text-blue-500 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderHistory.protected = true;
export default OrderHistory;

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  let orders = [];

  await db.connect();
  const allOrders = await Order.find({ user: session.user._id }).lean();
  await db.disconnect();

  if (allOrders && allOrders.length > 0) {
    orders = allOrders.map((order) => db.convertDocToObj(order));
  }

  return {
    props: {
      orderHistory: orders,
    },
  };
};
