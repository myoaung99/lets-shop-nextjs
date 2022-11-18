import { getSession } from "next-auth/react";
import Order from "../../model/Order";
import db from "../../utils/db";

const handler = async (req, res) => {
  //* ============= PROTECTING THE API ROUTE ===========
  //?======== get session return object or null base on whether a user is login or not
  const session = await getSession({ req });
  //? ======= if no session return
  if (!session) {
    return res.status(401).send("signin required");
  }

  //* ============= SAVING ORDERS IN DATABASE =============
  //? ======== if we got session => extract user object ==========
  const { user } = session;
  await db.connect();

  if (req.method === "POST") {
    //? ========= create new mongoose order object =========
    const newOrder = new Order({
      ...req.body,
      user: user._id,
    });

    //? ======= save the new oreder object and reture saved obj after disconnecting the db
    const order = await newOrder.save();
    await db.disconnect();
    return res.status(201).send(order);
  }
};

export default handler;
