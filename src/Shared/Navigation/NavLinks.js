import React, { useState, useContext } from "react";
import "./NavLinks.css";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const [isActive, setIsActive] = useState("home");

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
            to="/u1"
            onClick={() => {
              setIsActive("profile");
            }}
          >
            Profile
          </NavLink>{" "}
          {/* MY PLACES */}
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
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
