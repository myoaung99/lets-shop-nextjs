import User from "../../model/User";
import db from "../../utils/db";
import bcrypt from "bcrypt";

const dummy_users = [
  {
    name: "John",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "Jane",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: false,
  },
];

//*============== Function That Seed a.k.a Add Dummy User To DB ====================
async function handler(req, res) {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(dummy_users);
  await db.disconnect();
  res.send({ message: "Seeded dummy users successfully" });
}

export default handler;
