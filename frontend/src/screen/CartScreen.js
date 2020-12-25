import React from "react";
import { useLocation, useParams } from "react-router-dom";

function CartScreen() {
  const params = useParams();
  const location = useLocation();
  const qty = location.search ? location.search.split("=")[1] : 1;

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        Add to Cart: ProductId: {params.id} Qty:{qty}
      </p>
    </div>
  );
}

export default CartScreen;
