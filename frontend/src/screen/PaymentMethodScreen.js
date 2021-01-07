import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cart";

function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setpaymentMethod] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/place-order");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div className="payment-method">
          <div>
            <input
              type="radio"
              id="paypal"
              value="Paypal"
              name="paymentMethod"
              required
              checked
              onClick={(e) => {
                setpaymentMethod(e.target.value);
              }}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <input
              type="radio"
              id="PayTM"
              value="PayTM"
              name="paymentMethod"
              onClick={(e) => setpaymentMethod(e.target.value)}
            />
            <label htmlFor="PayTM">PayTM</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
