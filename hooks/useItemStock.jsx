import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../Store/context";

const useItemStock = (currentItem) => {
  const [inStock, setInStock] = useState(0);

  const cartCtx = useContext(Context);
  const {
    cart: { cartItems },
  } = cartCtx;

  useEffect(() => {
    if (currentItem) {
      const countInCart = cartItems.find(
        (item) => item.slug === currentItem.slug
      );

      if (!countInCart) {
        return setInStock(currentItem.countInStock);
      }
      setInStock(currentItem.countInStock - countInCart.quantity);
    }
  }, [currentItem, cartItems]);

  const updateStock = useCallback(() => {
    setInStock((prevStock) => prevStock + 1);
  }, [setInStock]);

  return [inStock, updateStock];
};

export default useItemStock;
