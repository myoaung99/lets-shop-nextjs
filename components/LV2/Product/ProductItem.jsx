import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }) => {
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

      <div className="flex flex-col items-center pb-3">
        <Link
          href={{
            pathname: "/[slug]",
            query: { slug: product.slug },
          }}
        >
          <h2 className="text-lg">{product.name}</h2>
        </Link>

        <p className="mb-2">{product.brand}</p>
        <p className="font-semibold mb-1">${product.price}</p>
        <button className="primary-button" type="button">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
