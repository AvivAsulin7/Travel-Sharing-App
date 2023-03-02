import React from "react";
import { Drawer, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavLinks from "./NavLinks";
import "./SlideDrawer.css";
import icon from "../images/icon.png";

const SildeDrawer = ({ drawerIsOpen, setDrawerIsOpen }) => {
  return (
    <>
      {" "}
      <Drawer
        open={drawerIsOpen}
        onClose={() => {
          setDrawerIsOpen(false);
        }}
        PaperProps={{ sx: { width: 220, backgroundColor: "#181823" } }}
        anchor="left"
      >
        <img src={icon} className="icon-slider" />
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </Drawer>
      <Button
        sx={{ color: "#fff" }}
        onClick={() => setDrawerIsOpen(!drawerIsOpen)}
      >
        {" "}
        <MenuIcon />{" "}
      </Button>
    </>
  );
};

export default SildeDrawer;
