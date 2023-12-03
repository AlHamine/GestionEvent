import React, { useState } from "react";
import { Button, TextField, InputAdornment, Container } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PersonAdd, Email, Lock } from "@mui/icons-material";
import FileIcon from "@mui/icons-material/FileCopy";
import { SERVER_URL } from "../constants";
import axios from "axios";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Snackbar from "@mui/material/Snackbar";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./UserProfile.css";
export default function AddCustomer(props) {
  const [file, setFile] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let ok;
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("mail", mail);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

  if (
      nom === "" ||
      prenom === "" ||
      mail === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
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
    // Vérifions si les mots de pass sont conformes
    if (password != confirmPassword) {
      alert(
        "Veuillez vérifier à ce que les mots de passe puissent etre similaires !"
      );
      return;
    }
    try {
      const response = await axios.post(
        SERVER_URL + "client/clientphoto",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("Inscription avec succes.");
    } catch (error) {
      alert("Veuilles verifier les champ de renseignement !");
      console.error(error);
    }
    setNom("");
    setPrenom("");
    setMail("");
    setPassword("");
    setConfirmPassword("");
    setFile(null);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <><button className="profile-card__button button--blue js-message-btn " onClick={handleOpen}><b>JE VEUX ORGANISER UN EVENEMENT</b></button>
      <Dialog open={open} onClose={handleClose}   >
        <DialogTitle> Nouveau Client </DialogTitle>
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
              // value={client.mail}
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
              id="confirmPassword"
              label="Confirmer Mot de passe"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              // value={client.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <TextField
              id="file"
              label="Fichier"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
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