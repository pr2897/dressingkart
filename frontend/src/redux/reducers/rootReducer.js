import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productListReducer, productDetailReducer } from "./productReducer";
import { userSignInReducer } from "./userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
});

export default rootReducer;
