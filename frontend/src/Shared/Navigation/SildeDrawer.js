import React from "react";
import { Drawer, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavLinks from "./NavLinks";
import "./SlideDrawer.css";
import travel from "../images/travel.jpg";

const SildeDrawer = ({ drawerIsOpen, setDrawerIsOpen }) => {
  return (
    <>
      {" "}
      <Drawer
        open={drawerIsOpen}
        onClose={() => {
          setDrawerIsOpen(false);
        }}
        PaperProps={{
          sx: {
            width: 220,
            background: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(${travel})`,
          },
        }}
        anchor="left"
      >
        <nav className="main-navigation__drawer-nav">
          <NavLinks setDrawerIsOpen={setDrawerIsOpen} />
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
