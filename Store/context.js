import { createContext } from "react";

const initialState = {
  cart: {
    cartItems: [],
    itemCount: 0,
    totalPrice: 0,
  },
  addToCart: (item) => {},
  removeFromCart: (slug) => {},
};

export const Context = createContext(initialState);
