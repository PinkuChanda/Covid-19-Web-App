import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AddLink from "../AddLink/AddLink";
import Auth from "../Auth/useAuth";

const NavBar = () => {
  const scsUser = localStorage.getItem("SCS_USER");
  const user = JSON.parse(scsUser);
  const auth = Auth();
  const hide = () => {
    let aria = document
      .getElementById("collapsed")
      .getAttribute("aria-expanded");
    if (aria === "true") {
      let element = document.getElementById("navbarNav");
      element.classList.remove("show");
      let x = document.getElementById("collapsed");
      x.classList.add("collapsed");
    }
  };
  const handleSignOut = () => {
    hide();
    auth.signOut();
    window.location.pathname = "/signin";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          S<span className="highLight">C</span>S
        </Link>
        <button
          id="collapsed"
          className="navbar-toggler navbar-toggler-right collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span className="navbar-toggler-icon"></span> */}
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item px-3">
              <Link onClick={() => hide()} className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link onClick={() => hide()} className="nav-link" to="/link">
                News
              </Link>
            </li>
            {/* {!user && (
              <>
                <li className="nav-item px-3">
                  <Link
                    onClick={() => hide()}
                    className="nav-link active"
                    aria-current="page"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item px-3">
                  <Link
                    onClick={() => hide()}
                    className="nav-link"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )} */}
            {user && (
              <>
                {user.isAdmin && (
                  <>
                    <li className="nav-item px-3">
                      <Link
                        onClick={() => hide()}
                        className="nav-link"
                        to="/links"
                      >
                        Link
                      </Link>
                    </li>
                    <li className="nav-item px-3">
                      <Link
                        onClick={() => hide()}
                        className="nav-link"
                        to="/addadmin"
                      >
                        Add Admin
                      </Link>
                    </li>
                    <li className="nav-item px-3">
                      <button
                        onClick={handleSignOut}
                        className="btn nav-link"
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        Sign out
                      </button>
                    </li>
                    <li className="nav-item">
                      <AddLink hide={hide} />
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
