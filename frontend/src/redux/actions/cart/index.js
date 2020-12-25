import axios from "axios";
import { CART_ADD_ITEM } from "./actionTypes";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`/api/v1/product/${productId}`);
  data = data.product;
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
