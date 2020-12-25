import { CART_ADD_ITEM } from "../actions/cart/actionTypes";

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
      console.log(state);
      const existItem = state.cartItems.find((x) => x.product === item._id);

      if (existItem) {
        console.log(`>>> exists`);
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};
