import { getSession } from "next-auth/react";
import Order from "../../model/Order";
import db from "../../utils/db";

const handler = async (req, res) => {
  //?======== get session object or null base on whether a user is login or not
  const session = await getSession({ req });
  //? ======= if no session return
  if (!session) {
    return res.status(401).send("signin required");
  }

  const { user } = session;
  await db.connect();

  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send(order);
};

export default handler;
