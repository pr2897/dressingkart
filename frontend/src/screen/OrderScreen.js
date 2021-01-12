import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { detailsOrder, payOrder } from "../redux/actions/order";

import PaymentButton from "../components/PaymentButton";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { error: errorPay, loading: loadingPay } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [orderId, dispatch]);

  const successPaymentHandler = (paymentResult) => {
    // console.log(`Success payment handler called`);
    // console.log(paymentResult);
    dispatch(payOrder(order, paymentResult));
    dispatch(detailsOrder(orderId));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>
        Order Details <strong>{order._id}</strong>
      </h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  <br />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered At {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delievered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod} <br />
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid At {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => {
                    return (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            />
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            {item.qty} x ₹{item.price} ={" "}
                            <strong> ₹{item.qty * item.price} </strong>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>₹{order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>₹{order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>₹{order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>₹{order.totalPrice}</strong>
                  </div>
                </div>
              </li>
            </ul>
            <hr />
            {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
            {loadingPay && <LoadingBox></LoadingBox>}
            {!order.isPaid && (
              <PaymentButton
                amountToPay={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
