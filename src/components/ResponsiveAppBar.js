import React, { useState } from "react";
import { SERVER_URL } from "../constants.js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
import ChatComponent from "./Chat.js";

const pages = ["Evenements", "myEvents", "Prestataires", "Propos"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenNotif = () => {
    setOpenNotif(true);
  };

  const handleCloseNotif = () => {
    setOpenNotif(false);
  };

  const action = (
    <Button color="secondary" size="small">
      Supprimer
    </Button>
  );
  let im = "";
  if (sessionStorage.getItem("role") == "client")
    im = `${SERVER_URL}` + `prestataires/${sessionStorage.getItem("photo")}`;
  else im = `${SERVER_URL}` + `client/${sessionStorage.getItem("photo")}`;
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
                ) : page === "myEvents" ? (
                  <Button color="success">
                    <Link
                      to="/myevents"
                      key={page}
                      style={{ color: "white", textDecoration: "none" }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Mes Evenements
                    </Link>
                  </Button>
                    ) :
                page === "Propos" ? (
                  <Button color="success">
                    <Link
                      to="/propos"
                      key={page}
                      style={{ color: "white", textDecoration: "none" }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      A Propos
                    </Link>
                  </Button>
                )   :(
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

            <IconButton
              size="large"
              aria-label="show new mails"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Badge badgeContent={4} color="error" onClick={handleClickOpen}>
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show new notifications"
              sx={{ marginRight: 3 }}
              onClick={handleClickOpenNotif}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* flexGrow: 0  */}
            <Box sx={{ marginRight: "1px" }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, marginRight: "1px" }}
                >
                  {<Avatar alt={sessionStorage.getItem("UserMail")} src={im} />}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleProfileClick}>
                    {setting === "Profile" ? (
                      <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Profile
                      </Link>
                    ) : setting === "Logout" ? (
                      <Logout />
                    ) : (
                      //   : setting === "Dashboard" ? (
                      // <EventListByClient />
                      //   )
                      <Typography textAlign="center">{setting}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        // sx={{ width: "100%", position: "absolute", right: 0, height: "100%" }}
        sx={{ position: "absolute", right: 80, top: 8 }}
      >
        <DialogTitle>
          <div
            style={{
              // position: "absolute",
              // left: "35%",
            }}
          >
            Nouveaux messages
            <ChatComponent/>
          </div>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ maxWidth: 600, marginTop: "30px" }}>
            <SnackbarContent message="I love snacks." action={action} />
            <SnackbarContent
              message={
                "I love candy. I love cookies. I love cupcakes. \
                 I love cheesecake. I love chocolate."
              }
            />
            <SnackbarContent
              message="I love candy. I love cookies. I love cupcakes."
              action={action}
            />
            <SnackbarContent
              message={
                "I love candy. I love cookies. I love cupcakes. \
                 I love cheesecake. I love chocolate."
              }
              action={action}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          {/* <Button onClick={handleSave}>Enregistrer</Button> */}
        </DialogActions>
      </Dialog>
      {open && (
        <div
          style={{
            // position: "left",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            marginLeft: "100%",
          }}
        ></div>
      )}

      <Dialog
        open={openNotif}
        onClose={handleCloseNotif}
        fullWidth
        maxWidth="sm"
        // sx={{ width: "100%", position: "absolute", right: 0, height: "100%" }}
        sx={{ position: "absolute", right: 80, top: 8 }}
      >
        <DialogTitle>
          <div
            style={{
              position: "absolute",
              left: "35%",
            }}
          >
            Nouvelles notifications
          </div>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ maxWidth: 600, marginTop: "30px" }}>
            <SnackbarContent message="I love snacks." action={action} />
            <SnackbarContent
              message={
                "I love candy. I love cookies. I love cupcakes. \
                 I love cheesecake. I love chocolate."
              }
            />
            <SnackbarContent
              message="I love candy. I love cookies. I love cupcakes."
              action={action}
            />
            <SnackbarContent
              message={
                "I love candy. I love cookies. I love cupcakes. \
                 I love cheesecake. I love chocolate."
              }
              action={action}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotif}>Annuler</Button>
          {/* <Button onClick={handleSave}>Enregistrer</Button> */}
        </DialogActions>
      </Dialog>
      {openNotif && (
        <div
          style={{
            // position: "left",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            marginLeft: "100%",
          }}
        ></div>
      )}
    </div>
  );
}
export default ResponsiveAppBar;
