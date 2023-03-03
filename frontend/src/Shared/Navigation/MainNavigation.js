import React, { useState, useContext } from "react";
import "./MainNavigation.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SlideDrawer from "./SildeDrawer";
import { AuthContext } from "../Contexts/AuthContext";
import colorNavContext from "../Contexts/colorNavContext";
import icon from "../images/icon.png";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { setIsActive } = useContext(colorNavContext);
  const auth = useContext(AuthContext);
  const changeColorNav = () => {
    if (auth.isLoggedIn) {
      setIsActive("users");
    } else {
      setIsActive("home");
    }
  };

  return (
    <>
      <header className="main-header">
        {isMatch ? (
          <>
            {" "}
            <SlideDrawer
              drawerIsOpen={drawerIsOpen}
              setDrawerIsOpen={setDrawerIsOpen}
            />
            <h1 className="main-navigation__title">
              {" "}
              <Link to="/" onClick={() => changeColorNav()}>
                Travel App
                <img src={icon} className="icon"></img>
              </Link>
            </h1>{" "}
          </>
        ) : (
          <>
            {" "}
            <h1 className="main-navigation__title">
              {" "}
              <Link to="/" onClick={() => changeColorNav()}>
                Travel App
                <img src={icon} className="icon"></img>
              </Link>
            </h1>
            <nav>
              <NavLinks />
            </nav>{" "}
          </>
        )}
      </header>
    </>
  );
};

export default MainNavigation;
