import { Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";
import EventList from "./EventList.js";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Snackbar from "@mui/material/Snackbar";
import About from "./About.js";
import ChatComponent from "./Chat.js";
import CustomerList from "./CustomerList.jsx";
import AddCustomer from "./AddCustumer.jsx";
import CreatePrestataire from "./CreatePrestataire.jsx";
import CreateClient from "./CreateClient.jsx";

// Exportez la fonction logout
// export { logout };

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
          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };
  const onLogout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return (
      <div>
        <ResponsiveAppBar />
        {/* <EventList /> */}
        <CustomerList/>
        <About />
        <Button onClick={onLogout}>Click me ?</Button>
        <ChatComponent />
      </div>
    );
  } else {
    return (
      <div>
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
          <Button ><CreatePrestataire /></Button>
          <Button ><CreateClient /></Button>
          
        </Stack>
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
