import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cart";

function ShippingAddressScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>

        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter full Name.."
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <textarea
            rows="3"
            type="text"
            id="address"
            placeholder="Enter Shipping Address.."
            value={address}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your City.."
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Your postal code.."
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Your Country.."
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
