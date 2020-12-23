import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";

function App() {
  return (
    <Router>
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
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen}></Route>
        </main>

        <footer className="row center">All rights reserved</footer>
      </div>
    </Router>
  );
}

export default App;
