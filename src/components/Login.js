import { Button, Stack, TextField } from "@mui/material";
import EventListByClient from "./EventListByClient";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";
import EventList from "./EventList.js";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Snackbar from "@mui/material/Snackbar";
import Footer from "./Footer.js";
import ChatComponent from "./Chat.js";
import CreatePrestataire from "./CreatePrestataire.jsx";
import CreateCustumer from "./CreateCustumer.jsx";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import DemandeList from "./DemandeList.jsx";

function Login({ setEstAuthentifie }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  // const [role, setRole] = useState("");
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
          // sessionStorage.setItem("idClient", user.idc);
          sessionStorage.setItem("UserMail", user.username);
          const decodedToken = jwtDecode(jwtToken);
          const role = decodedToken.role;
          sessionStorage.setItem("role", role);
          console.log(decodedToken);
          console.log(decodedToken.role);
          console.log(decodedToken.sub);

          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };
  const token = sessionStorage.getItem("jwt");

  // sessionStorage.setItem("roleUser", role);
  const gmail = sessionStorage.getItem("UserMail");
  // fetch(SERVER_URL + `login/mail?mail=${gmail}`, {
  //   headers: { "Content-Type": "application/json", Authorization: token },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setRole(data.role);
  //   })
  //   .catch((err) => console.error(err))
  //   .catch((err) => console.log(err));
  // const role = sessionStorage.getItem("role");
  // : 
  // console.log(sessionStorage.getItem("role") === "client");
  if (sessionStorage.getItem("role") === "client") {
    fetch(SERVER_URL + `client/mail?mail=${gmail}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("idClient", data.idc);
        sessionStorage.setItem("n", data.nom);
        sessionStorage.setItem("p", data.prenom);
      })
      .catch((err) => console.error(err))
      .catch((err) => console.log(err));
  }else{fetch(SERVER_URL + `prestataires/mail?mail=${gmail}`, {
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("idPrestataire", data.idp);
      sessionStorage.setItem("n", data.nom);
      sessionStorage.setItem("p", data.prenom);
    })
    .catch((err) => console.error(err))
    .catch((err) => console.log(err));}

  const onLogout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    // console.log("client".toLowerCase() == sessionStorage.getItem("role"));
    if (sessionStorage.getItem("role") === "client") {
      return (
        <div>
          <EventListByClient />
          {/* <Footer /> */}
          <ChatComponent />
        </div>
      );
    } else
      return (
        <div>
          <DemandeList />
          {/* <Footer /> */}
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
              {/* <CreatePrestataire /> */}
              {/* <CreateCustumer /> */}
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
