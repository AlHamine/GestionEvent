import React, { useState } from "react";
import { Button, TextField, InputAdornment, Container } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PersonAdd, Email, Lock, Work } from "@mui/icons-material";
import FileIcon from "@mui/icons-material/FileCopy";
import { SERVER_URL } from "../constants";
import axios from "axios";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function UpdatePrestataire(props) {
  const [file, setFile] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState(sessionStorage.getItem("UserMail"));
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [service, setService] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMail(sessionStorage.getItem("UserMail"));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("mail", mail);
    formData.append("password", password);
    formData.append("service", service);

    if (
      nom === "" ||
      prenom === "" ||
      mail === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Vérifier si le champ `mail` est de type `email`
    if (!mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      alert("L'adresse e-mail n'est pas valide.");
      return;
    }

    // Vérifier que le password est robust et contient au moins 8 caractères
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)) {
      alert("Votre mot de passe doit être robuste.");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.put(
        SERVER_URL + "prestataires/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("Modification avec succes.");
      window.location.href = "/login";
      setNom("");
      setPrenom("");
      setMail("");
      setPassword("");
      setFile(null);
      handleClose();
    } catch (error) {
      alert("Veuilles verifier les champ de renseignement !");
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        className="profile-card__button button--blue js-message-btn "
        onClick={handleOpen}
      >
        <b>Modification Prestataire</b>
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Update Prestataire </DialogTitle>
        <DialogContent>
          <Container>
            <TextField
              id="nom"
              label="Nom"
              variant="outlined"
              type="text"
              fullWidth
              onChange={(event) => setNom(event.target.value)}
              // value={client.nom}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAdd />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="prenom"
              type="text"
              // value={client.prenom}
              label="Prénom"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => setPrenom(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAdd />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="service"
              type="text"
              label="Service"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setService(event.target.value)}
            />
            <TextField
              id="password"
              label="Mot de passe"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              // value={client.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              id="passwordConfirmation"
              label="Confirmation du mot de passe"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              // value={client.password}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="file"
              label="Fichier"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
              required // Obliger l;insertion de la photo pour prestataire.
              onChange={(event) => setFile(event.target.files[0])}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FileIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <CancelSharpIcon color="error" />
          </Button>
          <Button onClick={handleSubmit}>
            <CheckCircleOutlineIcon color="success" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
