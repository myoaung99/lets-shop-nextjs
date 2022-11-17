import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Context } from "../Store/context";
import Product from "../model/Product";
import db from "../utils/db";
import axios from "axios";

const ProductDetail = ({ product }) => {
  const router = useRouter();

  const cartCtx = useContext(Context);
  const [inStock, setInStock] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios.get(`/api/products/${product._id}`);

      const countInCart = cartCtx.cart.cartItems.find(
        (item) => item.slug === product.slug
      );
      if (!countInCart) {
        return setInStock(data.countInStock);
      }
      setInStock(data.countInStock - countInCart.quantity);
    };
    if (product) {
      getCount();
    }
  }, [product, cartCtx.cart.cartItems]);

  const backHandler = () => {
    router.back();
  };

  const addToCartHandler = async () => {
    cartCtx.addToCart(product, 1);
    setInStock((prev) => prev - 1);
  };

  if (!product) {
    return <h1 className="text-black">Product not found.</h1>;
  }

  return (
    <>
      <Head>
        <title>{`${product.name} - Let's Shop`}</title>
      </Head>
      <div onClick={backHandler} className="mb-2">
        <h1 className="text-black underline cursor-pointer hover:text-yellow-500">
          back to products
        </h1>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3 text-black">
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
              <p>{inStock > 0 ? `${inStock} - instock` : "Out of stock"}</p>
            </div>
          </div>

          {inStock > 0 ? (
            <button
              onClick={addToCartHandler}
              className="primary-button w-full"
            >
              Add to Cart
            </button>
          ) : (
            <button className="primary-button-disabled w-full">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

//? ===== GET PRODUCT DETAIL FROM SERVER ======
export async function getServerSideProps(context) {
  await db.connect();
  const product = await Product.find({ slug: context.query.slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product[0] ? db.convertDocToObj(product[0]) : null,
    },
  };
}
