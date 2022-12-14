import Head from "next/head";
import ProductItem from "../components/LV2/Product/ProductItem";
import HomeSlider from "../components/LV2/UI/HomeSlider";
import Product from "../model/Product";
import db from "../utils/db";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <HomeSlider />

      <div className="mb-2">
        <text className="text-black text-xl">Products</text>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductItem key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}

//? ========== SSR with necessary data ==============
export async function getStaticProps() {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
    revalidate: 1,
  };
}
