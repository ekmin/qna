import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import image from "../../assets/login.jpg";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/reducers/auth.reducers";
import api from "../../utils/api";

const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = { email, password };

    try {
      const res = await api.post("/auth", body);

      dispatch(authActions.LOGIN_SUCCESS(res.data));

      try {
        const res = await api.get("/auth");

        dispatch(authActions.USER_LOADED(res.data));
      } catch (err) {
        console.log(err);
        dispatch(authActions.AUTH_ERROR());
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => setError(error.msg));
      }

      dispatch(authActions.LOGIN_FAIL());
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-4" style={{ marginBottom: "80px" }}>
      <div className="row align-items-center">
        <div className="col-md">
          <img src={image} alt="Image" className="img-fluid" />
          <Link to="/register">
            <p className="lead text-center">Create an account</p>
          </Link>
        </div>
        <div className="col-md">
          <h1 className="h1 mb-3 text-primary">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="form-control"
                id="floatingEmail"
                placeholder="your email"
              />
              <label htmlFor="floatingEmail">Your email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="form-control"
                id="floatingPassword"
                placeholder="password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-dark btn-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
