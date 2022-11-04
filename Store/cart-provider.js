import { useReducer } from "react";
import { Context } from "./context";
import types from "./types";

const cartDefaultValue = {
  cart: {
    cartItems: [],
    itemCount: 0,
    totalPrice: 0,
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

      const itemCount = updatedItems.reduce(
        (total, item) => (total = total + item.quantity),
        0
      );

      const totalPrice = updatedItems.reduce(
        (total, item) => (total = total + item.price * item.quantity),
        0
      );

      return {
        ...state,
        cart: { ...state.cart, cartItems: updatedItems, itemCount, totalPrice },
      };
    }
    case types.CART_REMOVE_ITEM: {
      const slug = action.payload;
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item.slug !== slug
      );

      const itemCount = updatedCartItems.reduce(
        (total, item) => (total = total + item.quantity),
        0
      );

      const totalPrice = updatedCartItems.reduce(
        (total, item) => (total = total + item.price * item.quantity),
        0
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
          itemCount,
          totalPrice,
        },
      };
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
