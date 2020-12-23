import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

function ProductScreen() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/v1/product/" + params.id);
      if (data.error) setError(data.error);
      else setProduct(data.product);
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      <Link to="/">Back to results</Link>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="row top">
          {console.log(product)}
          <div className="col-2">
            <img className="large" src={product.images} alt={product.image} />
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li>Price: ${product.price}</li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Price</div>
                    <div className="price">{product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div className="">
                      {product.countInStock > 0 ? (
                        <span className="success">In stock</span>
                      ) : (
                        <span className="danger">currently Unavaliable</span>
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <button className="primary block">Add to Cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
