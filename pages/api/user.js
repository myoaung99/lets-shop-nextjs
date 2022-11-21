import { getSession } from "next-auth/react";
import User from "../../model/User";
import db from "../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  await db.connect();
  if (req.method === "GET") {
    const result = await User.findOne({ _id: session.user._id }).lean();

    if (result) {
      return res.status(200).send({ user: result });
    }
    return res.status(404).send("No user was found.");
  }

  if (req.method === "PUT") {
    const result = await User.findByIdAndUpdate(
      { _id: req.body._id },
      req.body
    );
    if (result) {
      return res.status(200).send("Updated");
    }
    return res.status(404).send("No user was found.");
  }
  await db.disconnect();
};

export default handler;
