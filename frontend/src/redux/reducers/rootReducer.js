import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {
  orderCreateReducer,
  orderMineListReducer,
  orderPayReducer,
  ordersDetailReducer,
} from "./orderReducer";
import { productListReducer, productDetailReducer } from "./productReducer";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSignInReducer,
  userUpdateProfileReducer,
} from "./userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: ordersDetailReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

export default rootReducer;
