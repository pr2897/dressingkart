import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../components/Product";

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/v1/products");
      setProducts(data.products.products);
    };
    fetchData();
  }, []);
  return (
    <div className="row center">
      {products.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
}

export default HomeScreen;
