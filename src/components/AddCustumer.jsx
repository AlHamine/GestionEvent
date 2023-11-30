import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EventList from "./EventList.js";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ChatComponent from "./Chat.js";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Snackbar from "@mui/material/Snackbar";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";
import { SERVER_URL } from "../constants";
export default function AddCustomer(props) {
  const [open, SetOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
const [isAuthenticated, setAuth] = useState(false);
  const [client, setClient] = useState({
    nom: "",
    prenom: "",
    mail: "",
    service: "",
    password: "",
    photo: "",
  });

  const handleOpen = () => {
    SetOpen(true);
  };
  const handleClose = () => {
    SetOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };
let ok = true;
  const handleSave = () => {
    
    if (
      client.nom === "" ||
      client.prenom === "" ||
      client.mail === "" ||
      client.password === ""
    ) {
      alert("Veuillez remplir tous les champs.");
       ok = false;
      return;
    }
    // Vérifier si le champ `mail` est de type `email`
    if (
      !client.mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      alert("L'adresse e-mail n'est pas valide.");
      ok = false;
      return;
    }

    // Vérifier si le champ `password` est de type `string` et a au moins 8 caractères
    if (typeof client.password !== "string" || client.password.length < 2) {
      alert(
        "Le mot de passe doit être une chaîne de caractères de 8 caractères minimum."
      );ok = false;
      return;
    }
    props.addCustomer(client);
    setClient({
      ...client,
      nom: "test",
      prenom: "test",
      mail: "t@gmail.com",
      password: "123456789",
      photo: "",
    });
    handleClose();
  };
  // if (ok) {
    const user = {
        username: client.mail,
        password: client.password
      
    }
  // }
  
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
          sessionStorage.setItem("UserMail", client.mail);
          sessionStorage.setItem("n", client.nom);
        sessionStorage.setItem("p", client.prenom);
      
          setAuth(true);
        } else {
          setOpen2(true);
        }
      })
      .catch((err) => console.error(err));
  };
const token = sessionStorage.getItem("jwt");
  const gmail = sessionStorage.getItem("UserMail");
  fetch(SERVER_URL + `client/mail?mail=${gmail}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("idClient", data.idc);
      })
      .catch((err) => console.error(err))
    .catch((err) => console.log(err));
  if (isAuthenticated) {
    // console.log("client".toLowerCase() == sessionStorage.getItem("role"));
      return (
        <div>
          <EventList />
          {/* <Footer /> */}
          <ChatComponent />
        </div>
      );
    }else
  return (
    <div>
      {/* <Button variant="contained" onClick={handleOpen}> */}
      <Button variant="contained" onClick={handleOpen}>
               <b> JE VEUX ORGANISER UN EVENEMENT</b>
              </Button>
        
      {/* <Box
        onClick={handleOpen}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >

      </Box> */}
      {/* </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Nouveau client </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nom"
              name="nom"
              value={client.nom}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Prenom"
              name="prenom"
              value={client.prenom}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Adresse e-mail"
              name="mail"
              type="email"
              value={client.mail}
              onChange={handleChange}
            />
            <br />
            <TextField
              label=""
              variant="outlined"
              fullWidth
              type="file"
              value={client.photo}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Mot de pass"
              name="password"
              type="password"
              value={client.password}
              required
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <CancelSharpIcon color="error" />
          </Button>
          <Button onClick={() => { handleSave(); login(); }}>
            <CheckCircleOutlineIcon color="success" />
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
          open={open2}
          autoHideDuration={3000}
          onClose={() => setOpen2(false)}
          message="Login failed: Check your username and password"
        />
    </div>
  );
}
