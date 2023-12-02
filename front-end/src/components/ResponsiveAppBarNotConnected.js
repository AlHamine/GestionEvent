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
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBarNotConnected() {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [open, setOpen] = useState(false);
  // const [openNotif, setOpenNotif] = useState(false);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  // const handleProfileClick = () => {
  //   handleCloseUserMenu();
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleClickOpenNotif = () => {
  //   setOpenNotif(true);
  // };

  // const handleCloseNotif = () => {
  //   setOpenNotif(false);
  // };

  // const action = (
  //   <Button color="secondary" size="small">
  //     Supprimer
  //   </Button>
  // );

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
            {/* 
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            {/* <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography> */}

            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                {pages === "Evenements" ? (
                  <Link to="/event">
                    Evenements
                  </Link>
                ) : (
                  <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {pages}
                </Button>
                )}
                
              ))}
            </Box> */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box> */}
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
