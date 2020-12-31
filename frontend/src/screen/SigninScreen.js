import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../redux/actions/user";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            value={email}
            type="email"
            id="email"
            placeholder="Please enter your Email Id."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            placeholder="Please enter your Password."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer?<Link to="/register">Create your Account..</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
