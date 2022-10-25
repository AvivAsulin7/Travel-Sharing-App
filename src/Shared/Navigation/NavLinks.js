import React, { useState } from "react";
import "./NavLinks.css";
import { NavLink, Link } from "react-router-dom";

const NavLinks = () => {
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
    </ul>
  );
};

export default NavLinks;
