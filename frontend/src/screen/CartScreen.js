import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../redux/actions/cart";

function CartScreen() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const qty = location.search ? location.search.split("=")[1] : 1;

  const { id } = params;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        Add to Cart: ProductId: {id} Qty:{qty}
      </p>
    </div>
  );
}

export default CartScreen;
