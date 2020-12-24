const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} = require("../actions/Products/actionTypes");

const initialState = {
  loading: true,
  products: [],
  error: "",
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialProductState = {
  product: {},
  loading: true,
};

export const productDetailReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { product: null, loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { product: action.payload, loading: false };
    case PRODUCT_DETAIL_FAIL:
      return { err: action.payload, loading: false };

    default:
      return state;
  }
};
