import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./actionTypes";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`/api/v1/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
