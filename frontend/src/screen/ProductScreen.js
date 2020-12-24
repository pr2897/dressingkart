import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { fetchProductDetails } from "../redux/actions/Products";

function ProductScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  let { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(fetchProductDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to results</Link>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <div className="row top">
              {console.log(productDetails)}
              <div className="col-2">
                <img
                  className="large"
                  src={product.images}
                  alt={product.image}
                />
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
                            <span className="danger">
                              currently Unavaliable
                            </span>
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
      )}
    </div>
  );
}

export default ProductScreen;
