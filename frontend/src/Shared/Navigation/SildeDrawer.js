import React from "react";
import ReactDom from "react-dom";
import { Drawer, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavLinks from "./NavLinks";
import "./SlideDrawer.css";

const SildeDrawer = ({ drawerIsOpen, setDrawerIsOpen }) => {
  return (
    <>
      {" "}
      <Drawer
        open={drawerIsOpen}
        onClose={() => {
          setDrawerIsOpen(false);
        }}
        PaperProps={{ sx: { width: 220 } }}
        anchor="left"
      >
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
