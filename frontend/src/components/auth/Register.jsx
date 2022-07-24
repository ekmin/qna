import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import image from "../../assets/computer.jpg"

const Register = () => {
  return (
      <div class="container mt-4">
        <div class="row align-items-center">
          <div class="col-md">
            <h1 className="h1 mb-3">Register</h1>
            <form>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingName" placeholder="your name" />
                <label for="floatingName">Your name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingEmail" placeholder="your email" />
                <label for="floatingEmail">Your email</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingConPassword" placeholder="confirm password" />
                <label for="floatingConPassword">Confirm password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Register</button>
            </form>
          </div>
          <div class="col-md">
          <img src={image} alt="Image" className="img-fluid" />
          <Link to="/login"><p className="lead text-center">I am already a member</p></Link>
          </div>
        </div>
      </div>
  );
};

export default Register;