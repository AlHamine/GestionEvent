  import React, { useState, useEffect } from "react";
import Animefront from "./Animefront.json";
// import Animefront2 from "./Animefront2.json";
import Animation1 from "./Animation1.json";
import Prestation from "./Prestation.json";
import Lottie from "lottie-react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SERVER_URL } from "../constants.js";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import CreatePrestataire from "./CreatePrestataire.jsx";
import CreateCustumer from "./CreateCustumer.jsx";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function HomePageConnected() {
  const [open, setOpen] = useState(false);
  const gmail = sessionStorage.getItem("UserMail");
  const token = sessionStorage.getItem("jwt");
  // const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    nomEvent: "",
    date: "",
    desciption: "",
    lieu: "",
    organisateur: { idc: Number(sessionStorage.getItem("idClient")) },
  });

  useEffect(() => {
    fetch(SERVER_URL + `client/mail?mail=${gmail}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("idClient", data.idc);
        sessionStorage.setItem("n", data.nom);
        sessionStorage.setItem("p", data.prenom);
        // sessionStorage.setItem("client", data);
        // d = data;
      })
      .catch((err) => console.error(err))
      .catch((err) => console.log(err));
  }, [gmail, token]);

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const fetchEvents = () => {
  //   const token = sessionStorage.getItem("jwt");
  //   fetch(SERVER_URL + "api/evenements", {
  //     headers: { Authorization: token },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setEvents(data._embedded.evenements))
  //     .catch((err) => console.error(err));
  //   console.log(token);
  // };
  // const history = useHistory();
  const navigate = useNavigate();

  const addEvent = (event) => {
    fetch(SERVER_URL + "event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/events");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (event.organisateur.idc !== 0) {
      // props.addEvent(event);
      addEvent(event);
    } else {
      event.organisateur.idc = Number(sessionStorage.getItem("idClient"));
      setEvent(event);
      // props.addEvent(event);
      addEvent(event);
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
  // const addPrestataire = (prestataire) => {
  //   fetch(SERVER_URL + "prestataires", {
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify(prestataire),
  //   })
  //     .then((reponse) => {
  //       if (reponse.ok) {
  //         // fetchPrestataires();
  //       } else alert("Something went wrong !");
  //     })
  //     .catch((err) => console.error(err));
  // };

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
      <div
        style={{
          display: "flex",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            flex: 1,
            marginTop: "50px",
            marginBottom: "40px",
            marginLeft: "30px",
          }}
        >
          {/* Contenu texte à gauche */}
          <h1 style={{ color: "blue", textAlign: "#1b06f1" }}>
            Gerer vos evenements facilement.
          </h1>
          <p style={{ lineHeight: "2", color: "#776af5" }}>
            {" "}
            Organiser ou prester un événement n'a jamais <br /> ete si facile
            avec votre plateforme EVENT-PRO
          </p>
          <div>
            <div style={{ width: "50%", marginLeft: "15px" }}>
              <Lottie animationData={Animation1} />{" "}
                <CreatePrestataire />
            
            </div>

            {/* <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClickOpen}>
                CREER UN EVENEMENT
              </Button>
            </Stack> */}

            {/* <Stack direction="row-reverse" spacing={2}>
              <Button variant="contained" onClick={handleClickOpen}>
                JE VEUX ORGANISER UN EVENEMENT
              </Button>
            </Stack> */}
            {/* <Stack direction="row"   height="100px" spacing={4} mt={1}>
              <Button variant="contained"  color="success" onClick={handleClickOpen}>
               <b> JE VEUX PRESTER DANS UN EVENEMENT</b>
              </Button>
            </Stack> */}
          </div>
        </div>
        <div style={{ flex: 1, marginTop: "50px", marginBottom: "40px" }}>
          <Lottie animationData={Animefront} />{" "}
            <CreateCustumer/>
        </div>
      </div>

      <div
        style={{ display: "flex", boxShadow: "0px 5px 10px rgba(0, 0, 0, 1)" }}
      >
        <div style={{ flex: 1, marginLeft: "30px" }}>
          {/* Contenu texte à gauche */}
          <h1
            style={{ color: "#8171df", textAlign: "center", marginTop: "40px" }}
          >
            À PROPOS DE NOUS
          </h1>
          <p style={{ lineHeight: "2", color: "#776af5", marginTop: "60px" }}>
            EVENT-PRO est une organisation créée par des sénégalais qui regroupe
            sur une seule plateforme des services d'organisations d'événement et
            de prestations pour tout les types d'événements
          </p>
        </div>
        <div style={{ flex: 1, marginRight: "5px" }}>
          {/* Image à droite */}
          <img
            src="https://media.istockphoto.com/id/974238866/photo/audience-listens-to-the-lecturer-at-the-conference.jpg?s=612x612&w=0&k=20&c=p_BQCJWRQQtZYnQlOtZMzTjeB_csic8OofTCAKLwT0M="
            alt="img"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 1)",
          backgroundColor: "#f2f1f8",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Contenu texte à gauche */}
          <h1
            style={{
              color: "#827ca4",
              textAlign: "center",
              margin: "0 auto",
              marginTop: "20px",
            }}
          >
            L'événement
          </h1>
          <div
            style={{ lineHeight: "2", color: "#747379", marginLeft: "30px" }}
          >
            <div style={{ marginTop: "20%", marginLeft: "30px" }}>
              <div>EVENT-PRO est la solution qui permet de:</div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TaskAltIcon /> {" Etre au rendez-vous, sans retard.  "}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TaskAltIcon /> {" Une satisfaction totale pour ton événement.  "}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TaskAltIcon />{" "}
              {" Suivre les besoins de l'organisateur en temps.  "}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TaskAltIcon /> {" Simplifier les événements au Sénégal. "}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TaskAltIcon /> {" Economiser son argent evec EVENT-PRO.  "}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {/* Image à droite */}
          <img
            src="https://img.freepik.com/free-vector/festive-calendar-event-holiday-celebration-party-work-schedule-planning-project-management-deadline-idea-office-managers-excited-colleagues_335657-1610.jpg"
            alt="img"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 1)",
          backgroundColor: "#f2f1f8",
        }}
      >
        <div style={{ flex: 1, backgroundColor: "#fff" }}>
          {/* Contenu texte à gauche */}
          <h1
            style={{
              color: "blue",
              textAlign: "center",
              margin: "0 auto",
              marginTop: "20px",
            }}
          >
            Préstation
          </h1>
          <div
            style={{ lineHeight: "2", color: "#747379", marginLeft: "30px" }}
          >
            <div
              style={{ marginTop: "20%", marginLeft: "30px", color: "blue" }}
            >
              <div>EVENT-PRO votre meilleur service de prestation</div>
            </div>
            <div style={{ marginBottom: "10px", color: "blue" }}>
              <DoneAllIcon sx={{ color: "blue" }} /> {" Dans le mariage.  "}
            </div>
            <div style={{ marginBottom: "10px", color: "blue" }}>
              <DoneAllIcon /> {" Seremonie religieuse.  "}
            </div>
            <div style={{ marginBottom: "10px", color: "blue" }}>
              <DoneAllIcon /> {" Dans les meetings.  "}
            </div>
            <div style={{ marginBottom: "10px", color: "blue" }}>
              <DoneAllIcon /> {" Dans les finerailles. "}
            </div>
            <div style={{ marginBottom: "10px", color: "blue" }}>
              <DoneAllIcon /> {" Economiser son temps evec EVENT-PRO.  "}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {/* Image à droite */}
          <Lottie animationData={Prestation} />
        </div>
      </div>

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
            <DatePicker
              name="dkdk"
              value={event.date}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
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
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
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

export default HomePageConnected;
