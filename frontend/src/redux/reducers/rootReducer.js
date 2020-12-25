import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productListReducer, productDetailReducer } from "./productReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
});

export default rootReducer;
