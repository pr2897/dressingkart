import React from "react";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div className="card" key={product.name}>
      <a href="/product">
        <img className="medium" src="images/p1.jpg" alt="product" />
      </a>
      <div className="card-body">
        <a href="/product">
          <h2>{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}

export default Product;
