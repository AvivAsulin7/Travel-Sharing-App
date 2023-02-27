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
      {auth.isLoggedIn && (
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
      )}
      {auth.isLoggedIn && (
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
      )}
      {!auth.isLoggedIn && (
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
      )}
      {auth.isLoggedIn && (
        <li>
          <button
            onClick={() => {
              changePageToHome();
            }}
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
