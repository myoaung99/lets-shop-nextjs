import { useReducer } from "react";
import { Context } from "./context";
import Cookies from "js-cookie";
import types from "./types";

//*===============UTIL FUNCTIONS==================
const getTotalItem = (items) => {
  return items.reduce((total, item) => (total = total + item.quantity), 0);
};

const getTotalPrice = (items) => {
  return items.reduce(
    (total, item) => (total = total + item.price * item.quantity),
    0
  );
};

const saveToCookies = (items, count, total) => {
  Cookies.set(
    "cart",
    JSON.stringify({
      cartItems: items,
      itemCount: count,
      totalPrice: total,
    })
  );
};

//? ======== initial default values ============
const cartDefaultValue = {
  cart: {
    cartItems: Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart")).cartItems
      : [],
    itemCount: Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart")).itemCount
      : 0,
    totalPrice: Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart")).totalPrice
      : 0,
  },
  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress"))
    : {},
  paymentMethod: Cookies.get("paymentMethod")
    ? JSON.parse(Cookies.get("paymentMethod"))
    : "",
};

//? =========== reducer ================
const cartReducer = (state, action) => {
  switch (action.type) {
    case types.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      let updatedCartItems;

      if (existItem) {
        updatedCartItems = state.cart.cartItems.map((item) =>
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
        updatedCartItems = [...state.cart.cartItems, newItem];
      }

      const itemCount = getTotalItem(updatedCartItems);
      const totalPrice = getTotalPrice(updatedCartItems);
      saveToCookies(updatedCartItems, itemCount, totalPrice);

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
    case types.CART_REMOVE_ITEM: {
      const slug = action.payload;
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item.slug !== slug
      );

      const itemCount = getTotalItem(updatedCartItems);
      const totalPrice = getTotalPrice(updatedCartItems);
      saveToCookies(updatedCartItems, itemCount, totalPrice);

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
    case types.CART_UPDATE_QUANTITY:
      {
        const { item: updateItem, quantity: newQuantity } = action.payload;
        const existItem = state.cart.cartItems.find(
          (item) => item.slug === updateItem.slug
        );
        const existItemIndex = state.cart.cartItems.findIndex(
          (item) => item.slug === existItem.slug
        );
        existItem.quantity = newQuantity;
        const updatedCartItems = [...state.cart.cartItems];

        updatedCartItems[existItemIndex] = existItem;

        const itemCount = getTotalItem(updatedCartItems);
        const totalPrice = getTotalPrice(updatedCartItems);
        saveToCookies(updatedCartItems, itemCount, totalPrice);

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
      0.0;
    case types.CART_RESET: {
      Cookies.remove("cartItems");
      Cookies.remove("itemCount");
      Cookies.remove("totalPrice");
      break;
    }

    case types.SAVE_SHIPPING_ADDRESS: {
      Cookies.set(
        "shippingAddress",
        JSON.stringify({
          shippingAddress: {
            ...state.shippingAddress,
            ...action.payload,
          },
        })
      );

      break;
    }
    case types.SAVE_PAYMENT_METHOD: {
      Cookies.set("paymentMethod", JSON.stringify(action.payload));
      break;
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

  const updateItemQuantity = (item, quantity) => {
    dispatchCartAction({
      type: types.CART_UPDATE_QUANTITY,
      payload: { item, quantity },
    });
  };

  const removeFromCartHandler = (slug) => {
    dispatchCartAction({ type: types.CART_REMOVE_ITEM, payload: slug });
  };

  const resetCartHandler = () => {
    dispatchCartAction({ type: types.CART_RESET });
  };

  const saveAddressHandler = (address) => {
    dispatchCartAction({ type: types.SAVE_SHIPPING_ADDRESS, payload: address });
  };

  const savePaymentHandler = (payment) => {
    dispatchCartAction({ type: types.SAVE_PAYMENT_METHOD, payload: payment });
  };

  const value = {
    ...cartState,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    updateItemQuantity: updateItemQuantity,
    resetCart: resetCartHandler,
    saveAddress: saveAddressHandler,
    savePayment: savePaymentHandler,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default CartProvider;
