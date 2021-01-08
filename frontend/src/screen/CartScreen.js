import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { addToCart, removeFromCart } from "../redux/actions/cart";

function CartScreen() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const qty = location.search ? location.search.split("=")[1] : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { id } = params;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    //implement delete action
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1> Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is Empty.<Link to="/">Go shopping..!!</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => {
              return (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>₹{item.price}</div>
                    <div className="">
                      <button
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)})
                items :₹
                {cartItems.reduce((a, c) => a + Number(c.qty) * c.price, 0)}
              </h2>
            </li>
            <li>
              <button
                className="primary block"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
