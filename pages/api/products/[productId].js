import Product from "../../../model/Product";

async function handler(req, res) {
  const { productId } = req.query;
  const product = await Product.findOne({ _id: productId }).lean();
  return res.send(product);
}

export default handler;
