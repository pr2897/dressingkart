import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/v1/products");
      setProducts(data.products.products);
    };
    fetchData();
  }, [products]);
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            amazona
          </a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>

      <main>
        <div className="row center">
          {products.map((product) => (
            <div className="card" key={product.name}>
              <a href="/product">
                <img className="medium" src="images/p1.jpg" alt="product" />
              </a>
              <div className="card-body">
                <a href="/product">
                  <h2>{product.name}</h2>
                </a>
                <div className="rating">
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star-half-o"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
                <div className="price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="row center">All rights reserved</footer>
    </div>
  );
}

export default App;
