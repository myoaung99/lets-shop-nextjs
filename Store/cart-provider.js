import { useReducer } from "react";
import { CartContext } from "./context";
import types from "./types";

const cartDefaultValue = {
  cart: {
    cartItems: [],
  },
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case types.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems: cartItems } };
    }
  }
  return cartDefaultValue;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartDefaultValue
  );
  return <CartContext.Provider>{children}</CartContext.Provider>;
};

export default CartProvider;
