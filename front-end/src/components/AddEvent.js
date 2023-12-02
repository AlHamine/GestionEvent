import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SERVER_URL } from "../constants.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

function AddEvent(props) {
  const [open, setOpen] = useState(false);
  // const gmail = sessionStorage.getItem("UserMail");
  // const token = sessionStorage.getItem("jwt");
  // useEffect(() => {
  //   fetch(SERVER_URL + `client/mail?mail=${gmail}`, {
  //     headers: { "Content-Type": "application/json", Authorization: token },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       sessionStorage.setItem("idClient", data.idc);
  //       sessionStorage.setItem("n", data.nom);
  //       sessionStorage.setItem("p", data.prenom);
  //       // sessionStorage.setItem("client", data);
  //       // d = data;
  //     })
  //     .catch((err) => console.error(err))
  //     .catch((err) => console.log(err));
  // }, [gmail, token]);

  const [event, setEvent] = useState({
    nomEvent: "",
    date: "",
    desciption: "",
    lieu: "",
    organisateur: { idc: Number(sessionStorage.getItem("idClient")) },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function toDateFr(dateISO) {
    // Créer un objet Date à partir de la chaîne ISO
    var dateObj = new Date(dateISO);

    // Options pour le formatage de la date
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    // Formater la date en français
    var dateFrancaise = dateObj.toLocaleString("fr-FR", options);

    return dateFrancaise;
  }
  const handleSave = () => {
    if (event.organisateur.idc !== 0) {
      props.addEvent(event);
    } else {
      event.organisateur.idc = Number(sessionStorage.getItem("idClient"));
      setEvent(event);
      props.addEvent(event);
      // alert("Veuillez re-essayez encore   ");
    }
    setEvent({
      nomEvent: "",
      date: "",
      desciption: "",
      lieu: "",
      organisateur: { idc: Number(sessionStorage.getItem("idCient")) },
    });
    handleClose();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      date,
    }));
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="profile-card__button button--blue js-message-btn "
          variant="contained"
          disableElevation
          onClick={handleClickOpen}
          style={{ marginRight: "10px" }}
        >
          Créer un événement
        </Button>
      </div>

      {/* </Box> */}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Nouvel événement</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nom de l'événement"
              name="nomEvent"
              autoFocus
              variant="standard"
              value={event.nomEvent}
              onChange={handleChange}
            />
            <label htmlFor="dkdk">Entrer la Date( jj/mm/aa/hh:mm) :</label>

            <DatePicker
              name="dkdk"
              value={
                event.date == "" ? toDateFr(new Date()) : toDateFr(event.date)
              }
              onChange={handleDateChange}
              dateFormat="DD/MM/YYYY HH:MM"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
            />

            <TextField
              label="Desciption"
              name="desciption"
              variant="standard"
              value={event.desciption}
              onChange={handleChange}
            />
            <TextField
              label="Lieu"
              name="lieu"
              variant="standard"
              value={event.lieu}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="profile-card__button button--orange "
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            className="profile-card__button button--blue js-message-btn "
            onClick={handleSave}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        ></div>
      )}
    </div>
  );
}

export default AddEvent;
