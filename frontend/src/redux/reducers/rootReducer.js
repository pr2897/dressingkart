import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { orderCreateReducer, ordersDetailReducer } from "./orderReducer";
import { productListReducer, productDetailReducer } from "./productReducer";
import { userRegisterReducer, userSignInReducer } from "./userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: ordersDetailReducer,
});

export default rootReducer;
