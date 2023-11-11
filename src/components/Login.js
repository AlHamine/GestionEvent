import { Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";
import EventList from "./EventList.js";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Snackbar from "@mui/material/Snackbar";
import About from "./About.js";
import ChatComponent from "./Chat.js";
import CreatePrestataire from "./CreatePrestataire.jsx";
import CreateCustumer from "./CreateCustumer.jsx";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";

function Login({ setEstAuthentifie }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [open, setOpen] = useState(false);
  // Fonction de rappel pour mettre à jour estAuthentifie dans le composant parent
  const setEstAuthentifieCallback = (newValue) => {
    setAuth(newValue);
    // Mettez à jour estAuthentifie dans le composant parent
    setEstAuthentifie(newValue);
  };

  // Lorsque isAuthenticated change, appelez la fonction de rappel
  useEffect(() => {
    setEstAuthentifieCallback(isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken != null) {
          sessionStorage.setItem("jwt", jwtToken);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("UserMail", user.username);
          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const gmail = sessionStorage.getItem("UserMail");
  const token = sessionStorage.getItem("jwt");
  useEffect(() => {
    fetch(SERVER_URL + `client/mail?mail=${gmail}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("idClient", data.idc);
        sessionStorage.setItem("n", data.nom);
        sessionStorage.setItem("p", data.prenom);
        sessionStorage.setItem("client", data);
      })
      .catch((err) => console.error(err))
      .catch((err) => console.log(err));
  }, [gmail, token]);

  const onLogout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return (
      <div>
        <ResponsiveAppBar />
        <EventList />
        <About />
        <ChatComponent />
      </div>
    );
  } else {
    return (
      <div>
        <Backdrop
          open={true}
          style={{
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              mt: "10px", // Ajustez la marge supérieure
              mx: "20px", // Ajustez la marge horizontale
            }}
          >
            <Stack
              spacing={2}
              alignItems="center"
              boxShadow="0 0 5px blue"
              display="flex"
              justifyContent="center"
            >
              <TextField
                name="username"
                label="Username"
                onChange={handleChange}
                sx={{ p: "10px" }} // Ajustez la marge intérieure pour le TextField
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                onChange={handleChange}
                sx={{ p: "10px" }} // Ajustez la marge intérieure pour le TextField
              />
              <Button variant="outlined" color="primary" onClick={login}>
                Login
              </Button>
              <CreatePrestataire />
              <CreateCustumer />
            </Stack>
          </Box>
        </Backdrop>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </div>
    );
  }
}

export default Login;
