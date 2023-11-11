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

export default function AddPrestataire(props) {
  const [open, SetOpen] = useState(false);
  const [prestataire, setPrestataire] = useState({
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
    setPrestataire({ ...prestataire, [event.target.name]: event.target.value });
  };
  const handleSave = () => {
    if (
      prestataire.nom === "" ||
      prestataire.prenom === "" ||
      prestataire.mail === "" ||
      prestataire.service === "" ||
      prestataire.password === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Vérifier si le champ `mail` est de type `email`
    if (
      !prestataire.mail.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      )
    ) {
      alert("L'adresse e-mail n'est pas valide.");
      return;
    }

    // Vérifier si le champ `password` est de type `string` et a au moins 8 caractères
    if (
      typeof prestataire.password !== "string" ||
      prestataire.password.length < 8
    ) {
      alert(
        "Le mot de passe doit être une chaîne de caractères de 8 caractères minimum."
      );
      return;
    }
    props.addPrestataire(prestataire);
    setPrestataire({
      ...prestataire,
      nom: "",
      prenom: "",
      mail: "",
      service: "",
      password: "",
      photo: "",
    });
    handleClose();
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        <AddCircleOutlinedIcon /> Prestataire
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Nouveau prestataire </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nom"
              name="nom"
              value={prestataire.nom}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Prenom"
              name="prenom"
              value={prestataire.prenom}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Adresse e-mail"
              name="mail"
              type="email"
              value={prestataire.mail}
              onChange={handleChange}
            />
            <br />
            <TextField
              label=""
              variant="outlined"
              fullWidth
              type="file"
              value={prestataire.photo}
              onChange={handleChange}
            />
            <br />
            <TextField
              label="Service"
              name="service"
              value={prestataire.service}
              onChange={handleChange}
            />
            <TextField
              label="Mot de pass"
              name="password"
              type="password"
              value={prestataire.password}
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
