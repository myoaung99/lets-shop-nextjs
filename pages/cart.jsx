import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useContext } from "react";
import CartCheckout from "../components/LV2/Cart/CartCheckout";
import CartTable from "../components/LV2/Cart/CartTable";
import { Context } from "../Store/context";

const CartScreen = () => {
  const cartCtx = useContext(Context);
  const {
    cart: { cartItems, itemCount, totalPrice },
  } = cartCtx;

  return (
    <>
      <h2 className="text-lg">Shopping Cart</h2>
      {cartItems.length <= 0 ? (
        <div className="mt-2 text-sm  ">
          <span>No item in cart. </span>
          <Link href="/" className="underline">
            Why not get something?
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3 ">
            <CartTable items={cartItems} />
          </div>
          <CartCheckout
            items={cartItems}
            itemCount={itemCount}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </>
  );
};

//* export component with next/dynamic and ssr false option makes the component
//* to render lazily on client by depending on data from the client side

//* use next/dynamic and false ssr when the component need to dependend the data from the client size
//* eg. cookies, widows API
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
