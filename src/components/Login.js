import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { SERVER_URL } from "../constants";
import EventList from "./EventList.js";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Snackbar from "@mui/material/Snackbar";
import About from "./About.js";

// Exportez la fonction logout
// export { logout };

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [open, setOpen] = useState(false);
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
  const logout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return (
      <div>
        <ResponsiveAppBar />
        <EventList />
        <About />
        <Button onClick={logout}>Click me ?</Button>
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
