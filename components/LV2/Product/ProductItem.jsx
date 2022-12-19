import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import useItemStock from "../../../hooks/useItemStock";
import { Context } from "../../../Store/context";

const ProductItem = ({ product }) => {
  const cartCtx = useContext(Context);
  const [itemStock] = useItemStock(product);

  const addToCartHandler = () => {
    if (itemStock > 0) {
      cartCtx.addToCart(product, 1);
    }
  };

  return (
    <div className="card">
      <Link
        href={{
          pathname: "/[slug]",
          query: { slug: product.slug },
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-tl-md rounded-tr-md"
        />
      </Link>

      <div className="flex flex-col items-center pb-3 pt-1">
        <Link
          href={{
            pathname: "/[slug]",
            query: { slug: product.slug },
          }}
        >
          <h2 className="text-lg text-black">{product.name}</h2>
        </Link>

        <p className="mb-2 text-black">{product.brand}</p>
        <p className="font-semibold mb-1 text-black">${product.price}</p>
        {itemStock > 0 ? (
          <button onClick={addToCartHandler} className="primary-button">
            Add to Cart
          </button>
        ) : (
          <button className="primary-button-disabled ">Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
