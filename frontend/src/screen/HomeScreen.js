import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/Products";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
