import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import data from "../utils/data";
import Image from "next/image";

const ProductDetail = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const backHandler = () => {
    router.back();
  };

  const product = data.products.find((p) => p.slug === slug);
  if (!product) {
    return <h1>Product not found.</h1>;
  }

  return (
    <>
      <Head>
        <title>{product.name} - Let`s Shop</title>
      </Head>
      <div onClick={backHandler} className="mb-2">
        <h1 className="text-black underline cursor-pointer hover:text-yellow-500">
          back to products
        </h1>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 ">
          <Image
            className="rounded"
            src={product.image}
            alt={product.name}
            width={600}
            height={500}
          />
        </div>

        <div>
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>
            {product.rating} of {product.numReviews} reviews
          </p>
          <p>Description: {product.description}</p>
        </div>

        <div className="card h-fit p-3 space-y-3">
          <div>
            <div className="flex justify-between">
              <p>Price</p>
              <p>${product.price}</p>
            </div>
            <div className="flex justify-between">
              <p>Status</p>
              <p>{product.countInStock > 0 ? "In stock" : "Out of stock"}</p>
            </div>
          </div>

          <button className="primary-button w-full">Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
