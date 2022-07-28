import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import image from "../../assets/qna_logo.png";

import { logout } from "../../store/actions/auth.actions";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const guestLinks = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="/questions">
          Questions
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="/questions">
          Questions
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/ask">
          Ask
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/your-questions">
          Your Questions
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/your-answers">
          Your Answers
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={() => dispatch(logout())} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={image} alt="" width="55" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuth ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
