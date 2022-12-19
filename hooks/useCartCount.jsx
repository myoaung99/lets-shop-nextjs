import { useContext, useEffect, useState } from "react";
import { Context } from "../Store/context";

const useCartCount = () => {
  const cartCtx = useContext(Context);
  const {
    cart: { itemCount },
  } = cartCtx;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(itemCount);
  }, [itemCount]);

  return cartCount;
};

export default useCartCount;
