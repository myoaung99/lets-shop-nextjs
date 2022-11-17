import User from "../../../model/User";
import db from "../../../utils/db";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  //? ======== CHECK THE REQUEST METHOD ===============
  if (req.method !== "POST") {
    return res.status(400).send({ message: "Invalid request" });
  }

  const { name, email, password } = req.body;

  //? =========== CHECK THE FORM VALUES ===============
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6
  ) {
    return res.status(422).send({ message: "Bad request" });
  }

  await db.connect();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).send({ message: "User already exist." });
  }

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  await db.disconnect();

  const user = await newUser.save();

  res.status(201).send({
    message: "User Created.",
    _id: user._id,
    name: user.name,
    email: user.email,
    password: password,
    isAdmin: user.isAdmin,
  });
};

export default handler;
