const { combineReducers } = require("redux");
const { productListReducer } = require("./productReducer");

const rootReducer = combineReducers({ productList: productListReducer });

export default rootReducer;
