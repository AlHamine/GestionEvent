import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import DataArrayIcon from "@mui/icons-material/DataArray";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import AirlinesIcon from "@mui/icons-material/Airlines";

import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Logout from "./Logout";
import EventListByClient from "./EventListByClient";

const pages = ["Evenements", "Prestataires"];

function ResponsiveAppBarNotConnected() {
  
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ marginLeft: "0px", marginRight: "0px" }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{ marginLeft: "0px" }}
            >
              <Link to="/" passHref>
                <Button
                  as="a"
                  variant="text"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <DataArrayIcon />
                  EVENT-PRO
                  <AirlinesIcon />
                </Button>
              </Link>
            </Typography>
            
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) =>
                page === "Evenements" ? (
                  <Button>
                    <Link
                      to="/events"
                      key={page}
                      style={{ color: "white", textDecoration: "none" }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Les Evenements
                    </Link>
                  </Button>
                ) : page === "Prestataires" ? (
                  <Button>
                    <Link
                      to="/prest"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Prestataires
                    </Link>
                  </Button>
                ) : (
                  <Button
                    key={page}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                )
              )}
            </Box>
            
            <Button variant="contained">
              <Link color="white" to="/login">
                <SensorOccupiedIcon />
                <b style={{"color":"white"}}>connexion</b>
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBarNotConnected;
