import { useReducer } from "react";
import { Context } from "./context";
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

      let updatedItems;

      if (existItem) {
        updatedItems = state.cart.cartItems.map((item) =>
          item.slug === existItem.slug
            ? {
                ...newItem,
                quantity:
                  (item.quantity && item.quantity + newItem.quantity) ||
                  newItem.quantity,
              }
            : item
        );
      } else {
        updatedItems = [...state.cart.cartItems, newItem];
      }

      return { ...state, cart: { ...state.cart, cartItems: updatedItems } };
    }
    case types.CART_REMOVE_ITEM: {
      const slug = action.payload;
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item.slug !== slug
      );
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    }
  }
  return state;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartDefaultValue
  );

  const addToCartHandler = (product) => {
    dispatchCartAction({
      type: types.CART_ADD_ITEM,
      payload: { ...product, quantity: 1 },
    });
  };

  const removeFromCartHandler = (slug) => {
    dispatchCartAction({ type: types.CART_REMOVE_ITEM, payload: slug });
  };

  const value = {
    ...cartState,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default CartProvider;
