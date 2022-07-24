import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import image from "../../assets/7747.jpg";
import easy from "../../assets/easy-to-use.png";
import userin from "../../assets/user-interface.png";
import responsive from "../../assets/responsive.png";

const Landing = () => {
  return (
    <Fragment>
      <div class="container mt-4">
        <div class="row align-items-center">
          <div class="col">
            <h1 className="display-1">
              <strong>QNA</strong>
            </h1>
            <h2 className="h2">Perfect place to find answer</h2>
            <p class="lead">
              Create a QNA account and ask your questions from someone who knows
              the answer
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              REGISTER
            </Link>{" "}
            <Link to="/login" className="btn btn-dark btn-lg">
              LOGIN
            </Link>
          </div>
          <div class="col">
            <img src={image} alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="container text-center mt-5">
        <h2 className="display-4">Why QNA ?</h2>
        <p className="lead">
          Why you should consider using QNA ? Seriously Why ?
        </p>
        <div class="row align-items-center">
          <div class="col">
            <h4>Easy To Use</h4>
            <img
              src={easy}
              width="200"
              alt="Image"
              className="rounded img-thumbnail"
            />
          </div>
          <div class="col">
            <h4>Bette user interface</h4>
            <img
              src={userin}
              width="200"
              alt="Image"
              className="rounded img-thumbnail"
            />
          </div>
          <div class="col">
            <h4>Responsive design</h4>
            <img
              src={responsive}
              width="200"
              alt="Image"
              className="rounded img-thumbnail"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
