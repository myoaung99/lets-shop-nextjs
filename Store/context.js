import { createContext } from "react";

const initialState = {
  cart: {
    cartItems: [],
  },
  addToCart: (item) => {},
};

export const Context = createContext(initialState);
