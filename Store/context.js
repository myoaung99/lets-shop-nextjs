import { createContext } from "react";

const initialState = {
  cart: {
    cartItems: [],
    itemCount: 0,
    totalPrice: 0,
    shippingAddress: {},
  },
  addToCart: (item) => {},
  removeFromCart: (slug) => {},
  updateItemQuantity: (item, quantity) => {},
  saveAddress: (address) => {},
};

export const Context = createContext(initialState);
