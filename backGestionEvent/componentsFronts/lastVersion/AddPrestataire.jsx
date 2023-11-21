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
import { SERVER_URL } from "../../constants";
import axios from "axios";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function AddPrestataire(props) {
  const [file, setFile] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");
  const [open, setOpen] = useState(false);

  const defaultImage =
    "/home/tinkin-djeeri/Documents/Travaux/Projet/backGestionEvent/src/assets/defaultprofil.jpg";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("mail", mail);
    formData.append("password", password);
    formData.append("service", service);

    if (nom === "" || prenom === "" || mail === "" || password === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Vérifier si le champ `mail` est de type `email`
    if (!mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      alert("L'adresse e-mail n'est pas valide.");
      return;
    }

    // Vérifier si le champ `password` est de type `string` et a au moins 8 caractères
    if (typeof password !== "string" || password.length < 2) {
      alert(
        "Le mot de passe doit être une chaîne de caractères de 8 caractères minimum."
      );
      return;
    }

    // if (file === null) {
    //   formData.append("file", defaultImage);
    // }

    try {
      const response = await axios.post(
        SERVER_URL + "prestataires/prestatairephoto",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("Inscription avec succes.");
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
      <Button variant="contained" onClick={handleOpen}>
        <AddCircleOutlinedIcon /> Prestataire
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Nouveau Prestataire </DialogTitle>
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
              id="mail"
              type="email"
              label="Email"
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
              onChange={(event) => setMail(event.target.value)}
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
