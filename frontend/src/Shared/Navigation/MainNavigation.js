import React, { useState } from "react";
import "./MainNavigation.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SlideDrawer from "./SildeDrawer";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

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
              <Link to="/">Travel App</Link>
            </h1>{" "}
          </>
        ) : (
          <>
            {" "}
            <h1 className="main-navigation__title">
              {" "}
              <Link to="/">Travel App</Link>
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
