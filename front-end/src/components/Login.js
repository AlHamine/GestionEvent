import { Button, Stack, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import DemandeList from "./DemandeList.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EventList from "./EventList.js";
import CreatePrestataire from "./CreatePrestataire.jsx";
import CreateCustumer from "./CreateCustumer.jsx";

import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function Login({ setEstAuthentifie }) {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeCustomer = (event) => {
    setIsChecked(event.target.checked);
    // Vous pouvez effectuer d'autres actions ici en fonction de l'état de la case à cocher.
  };

  if (isChecked) {
    navigate("/");
  }

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
        sessionStorage.setItem("photo", data.photo);
      })
      .catch((err) => console.error(err))
      .catch((err) => console.log(err));
  } else {
    fetch(SERVER_URL + `prestataires/mail?mail=${gmail}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("idPrestataire", data.idp);
        sessionStorage.setItem("n", data.nom);
        sessionStorage.setItem("p", data.prenom);
        sessionStorage.setItem("photo", data.photo);
        sessionStorage.setItem("service", data.service);
      })
      .catch((err) => console.error(err))
      .catch((err) => console.log(err));
  }

  const onLogout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const handleChangeCustomer = () => {
  //   <CreatePrestataire />;
  // };

  if (isAuthenticated) {
    // console.log("client".toLowerCase() == sessionStorage.getItem("role"));
    if (sessionStorage.getItem("role") === "client") {
      return (
        <div>
          <EventList />
          {/* <Footer /> */}
          {/* <ChatComponent /> */}
        </div>
      );
    } else
      return (
        <div>
          <DemandeList />
          {/* <Footer /> */}
          {/* <ChatComponent /> */}
        </div>
      );
  } else {
    return (
      <div>
        <Backdrop open={true}>
          <WallPaper />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              mt: "10px", // Ajustez la marge supérieure
              mx: "20px", // Ajustez la marge horizontale
              backgroundColor: "#eae9f3",
              borderRadius: "10px", // Ajustez la valeur du rayon de la bordure
              padding: "20px", // Ajustez le rembourrage selon vos besoins
              boxShadow: "0 0 5px blue",
            }}
          >
            {/* <Box sx={{ width: "100%", overflow: "hidden" }}> */}
            <Stack
              spacing={2}
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                sx={{ p: "10px" }} // Ajustez la marge intérieure pour le TextField
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                sx={{ p: "10px" }} // Ajustez la marge intérieure pour le TextField
              />
              <Button variant="outlined" color="primary" onClick={login}>
                Login
              </Button>

              {/* <div style={{ color: "blue" }}>
                <Checkbox {...label} onChange={handleChangeCustomer} />{" "}
                {"Creer un compte client"}
              </div>
              <div style={{ color: "blue" }}>
                <Checkbox {...label} onChange={handleChangeCustomer} />{" "}
                {"Être prestataire"}
              </div> */}
              <CreatePrestataire />
              <CreateCustumer />
            </Stack>
            {/* </Box> */}
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
