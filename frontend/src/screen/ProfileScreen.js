import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../redux/actions/user";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProfileScreen() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const { userInfo } = userSignIn;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Enter name" value={user.name} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={user.email}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label htmlFor="cnfpassword">Confirm Password</label>
              <input
                id="cnfpassword"
                type="password"
                placeholder="Confirm  password"
              />
            </div>
            <div>
              <label htmlFor=""></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;
