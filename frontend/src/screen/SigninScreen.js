import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/actions/user";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const query = useLocation().search;
  const redirect = query ? query.slice(1).split("=")[1] : "/";
  // console.log(redirect);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const history = useHistory();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
