import React, { FC, ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";

import { isAuthenticated } from "../../helpers/isAuthenticated";
import { useLocation } from "react-router-dom";

const Header: FC = (): ReactElement => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (!isAuthenticated() || isHome) {
    return <></>;
  }

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar
      position="static"
      sx={{ backgroundColor: "primary.dark", color: "white" }}
    >
      <Toolbar
        variant="dense"
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
        }}
      >
        <NavLink
          to="/"
          style={() => {
            return {
              textDecoration: "none",
              color: "white",
            };
          }}
          end
        >
          HOME
        </NavLink>

        <NavLink
          to="/lists"
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              color: "white",
              fontWeight: isActive && "bold",
              fontSize: isActive && "large",
            };
          }}
          end
        >
          ACTIVE LISTS
        </NavLink>
        <NavLink
          to="/lists/old"
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              color: "white",
              fontWeight: isActive && "bold",
              fontSize: isActive && "large",
            };
          }}
        >
          OLD LISTS
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
