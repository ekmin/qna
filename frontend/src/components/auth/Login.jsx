import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import image from "../../assets/login.jpg"

const Login = () => {
  return (
      <div class="container mt-4" style={{marginBottom: "80px"}}>
        <div class="row align-items-center">
          <div class="col-md">
          <img src={image} alt="Image" className="img-fluid" />
          <Link to="/register"><p className="lead text-center">Create an account</p></Link>
          </div>
          <div class="col-md">
            <h1 className="h1 mb-3 text-primary">Login</h1>
            <form>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingEmail" placeholder="your email" />
                <label for="floatingEmail">Your email</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="password" />
                <label for="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-dark btn-lg">Login</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;