import { createContext } from "react";

const initialState = {
  cart: {
    cartItems: [],
    itemCount: 0,
    totalPrice: 0,
  },
  shippingAddress: {},
  paymentMethod: "",
  resetCart: () => {},
  addToCart: (item) => {},
  removeFromCart: (slug) => {},
  updateItemQuantity: (item, quantity) => {},
  saveAddress: (address) => {},
  savePayment: (method) => {},
};

export const Context = createContext(initialState);
