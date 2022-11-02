import Head from "next/head";
import React from "react";
import ProductItem from "../LV2/Product/ProductItem";

const HomePage = ({ products }) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductItem key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
