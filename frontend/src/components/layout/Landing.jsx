import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import image from "../../assets/7747.jpg";
import easy from "../../assets/easy-to-use.png";
import userin from "../../assets/user-interface.png";
import responsive from "../../assets/responsive.png";
import { login } from "../../store/actions/auth.actions";

const Landing = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth?.user?.name);
  
  return (
    <Fragment>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md">
            <h1 className="display-1">
              <strong>QNA</strong>
            </h1>
            <h2 className="h2">The best place to find answers</h2>
            <p className="lead">
              {!isAuth ? "Create an QNA account and ask your questions from someone who know the answers" : `Welcome Back, ${user}`}
            </p>
            {!isAuth ? <div><Link to="/register" className="btn btn-primary btn-lg">
              REGISTER
            </Link>{" "}
            <Link to="/login" className="btn btn-dark btn-lg">
              LOGIN
            </Link></div> : <div><Link to="/questions" className="btn btn-primary btn-lg">
              Questions
            </Link>{" "}
            <Link to="/ask" className="btn btn-dark btn-lg">
              Ask
            </Link></div>}
          </div>
          <div className="col-md">
            <img src={image} alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
      <div
        className="container text-center"
        style={{ marginBottom: "100px", marginTop: "150px" }}
      >
        <h2 className="display-4">Why QNA ?</h2>
        <p className="lead">
          Why you should consider using QNA ? Seriously Why ?
        </p>
        <div className="row align-items-center">
          <div className="col-sm">
            <h4>Easy To Use</h4>
            <img
              src={easy}
              width="200"
              alt="Image"
              className="rounded img-thumbnail"
            />
          </div>
          <div className="col-sm">
            <h4>Simple user interface</h4>
            <img
              src={userin}
              width="200"
              alt="Image"
              className="rounded img-thumbnail"
            />
          </div>
          <div className="col-sm">
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
