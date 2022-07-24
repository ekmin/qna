import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import image from "../../assets/computer.jpg";

import { authActions } from "../../store/reducers/auth.reducers";
import setAuthToken from "../../utils/setAuthToken";
import api from "../../utils/api";

const Register = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function submitHandler(event) {
    event.preventDefault();

    if (password !== password2) {
      setError("Passwords Do Not Match");
    } else {
      try {
        const res = await api.post("/register", formData);

        dispatch(authActions.REGISTER_SUCCESS(res.data));

        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
        try {
          const res = await api.get("/auth");

          dispatch(authActions.USER_LOADED(res.data));
        } catch (err) {
          dispatch(authActions.AUTH_ERROR());
        }
      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => setError(error.msg));
          console.log(errors);
        }

        dispatch(authActions.AUTH_ERROR());
      }
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md">
          <h1 className="h1 mb-3">Register</h1>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="form-control"
                id="floatingName"
                placeholder="your name"
              />
              <label htmlFor="floatingName">Your name</label>
            </div>
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
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                className="form-control"
                id="floatingConPassword"
                placeholder="confirm password"
              />
              <label htmlFor="floatingConPassword">Confirm password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </form>
        </div>
        <div className="col-md">
          <img src={image} alt="Image" className="img-fluid" />
          <Link to="/login">
            <p className="lead text-center">I am already a member</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
