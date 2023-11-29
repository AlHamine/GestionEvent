import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";

export default function AddCustomer(props) {
  const [open, SetOpen] = useState(false);

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

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    if (
      client.nom === "" ||
      client.prenom === "" ||
      client.mail === "" ||
      client.password === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Vérifier si le champ `mail` est de type `email`
    if (
      !client.mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      alert("L'adresse e-mail n'est pas valide.");
      return;
    }

    // Vérifier si le champ `password` est de type `string` et a au moins 8 caractères
    if (typeof client.password !== "string" || client.password.length < 2) {
      alert(
        "Le mot de passe doit être une chaîne de caractères de 8 caractères minimum."
      );
      return;
    }
    props.addCustomer(client);
    setClient({
      ...client,
      nom: "",
      prenom: "",
      mail: "",
      password: "",
      photo: "",
    });
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="contained" onClick={handleOpen}> */}
      <Button variant="contained" onClick={handleOpen}>
                JE VEUX ORGANISER UN EVENEMENT
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
          <Button onClick={handleSave}>
            <CheckCircleOutlineIcon color="success" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
