import axios from "axios";
import { CART_EMPTY } from "../cart/actionTypes";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
} from "./actionTypes";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/v1/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cart");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.message && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignIn: { userInfo },
  } = getState();

  const {
    paymentMethodData: {
      info: { cardDetails: card_detail },
    },
  } = paymentResult;

  try {
    const { data } = await axios.put(
      `/api/v1/orders/${order._id}/pay`,
      { card_detail, status: "SUCCESS" },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    // const { {info} paymentMethodData : } = paymentResult;

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.message && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const listMyOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/v1/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.message && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};
