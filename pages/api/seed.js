import User from "../../model/User";
import db from "../../utils/db";
import bcrypt from "bcrypt";
import data from "../../utils/data";
import Product from "../../model/Product";

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
  },
];

//? ============== Handler That Seed a.k.a Add Dummy Data To DB ====================
async function handler(req, res) {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(dummy_users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "Seeded dummy users successfully" });
}

export default handler;
