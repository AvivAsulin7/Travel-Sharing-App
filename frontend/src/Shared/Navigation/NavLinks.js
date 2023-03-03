import React, { useState, useContext } from "react";
import "./NavLinks.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import colorNavContext from "../Contexts/colorNavContext";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const { isActive, setIsActive } = useContext(colorNavContext);
  const navigate = useNavigate();

  const changePageToHome = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <>
          <li>
            <Link
              className={isActive === "users" ? "active" : "nav-links a "}
              to="/"
              onClick={() => {
                setIsActive("users");
              }}
            >
              Users
            </Link>
          </li>
          <li>
            <NavLink
              className={isActive === "profile" ? "active" : "nav-links a "}
              to={`/${auth.userId}`}
              onClick={() => {
                setIsActive("profile");
              }}
            >
              Profile
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              className={isActive === "new-travel" ? "active" : "nav-links a "}
              to="/posts/new"
              onClick={() => {
                setIsActive("new-travel");
              }}
            >
              Add Travel
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                changePageToHome();
              }}
            >
              Logout
            </button>
          </li>
        </>
      )}
      {!auth.isLoggedIn && (
        <>
          <li>
            <Link
              className={isActive === "home" ? "active" : "nav-links a "}
              to="/"
              onClick={() => {
                setIsActive("home");
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={isActive === "users" ? "active" : "nav-links a "}
              to="/users"
              onClick={() => {
                setIsActive("users");
              }}
            >
              Users
            </Link>
          </li>
          <li>
            <NavLink
              className={isActive === "auth" ? "active" : "nav-links a "}
              to="/auth"
              onClick={() => {
                setIsActive("auth");
              }}
            >
              Login/Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
