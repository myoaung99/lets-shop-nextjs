import { createContext } from "react";

const initialState = {
  cart: {
    cartItems: [],
  },
  addToCart: (item) => {},
  removeFromCart: (slug) => {},
};

export const Context = createContext(initialState);
