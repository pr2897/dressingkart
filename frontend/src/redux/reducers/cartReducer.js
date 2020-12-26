import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/cart/actionTypes";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartReducer = (
  state = { cartItems: initialState.cart },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // console.log(`action.payload: ${JSON.stringify(action.payload)}`);

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      const updatedCart = {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
      return updatedCart;

    default:
      return state;
  }
};
