import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../constants.js";
import "../index.css";
import "./UserProfile.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddEvent from "./AddEvent.js";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import "../App.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SnackbarContent from "@mui/material/SnackbarContent";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Footer from "./Footer.js";
import RatingStars from "./RatingStars.jsx";

function EventListByClient() {
  const [events, setEvents] = useState([]);
  const [prestataires, setPrestataires] = useState([]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Ajoutez cet état pour le terme de recherche
  const [selectedValue, setSelectedValue] = useState("");
  const [cliked, setClick] = useState(false);
  const [estSelected, SetEstSelected] = useState(false);
  const [estSelected2, SetEstSelected2] = useState(false);
  const [ListSelected, setListSelected] = useState("");
  const [idD, setIdD] = useState(-1);
  // var ListSelected = ""; //On y met les id deja selectionnes
  // const fetchDemandes = () => {
  //   const token = sessionStorage.getItem("jwt");
  //   fetch(SERVER_URL + "api/demandes", {
  //     headers: { Authorization: token },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setPrestataires(data._embedded.prestataires))
  //     .catch((err) => console.error(err));
  // };

  // const fetchPrestataires = () => {
  //   const token = sessionStorage.getItem("jwt");
  //   fetch(SERVER_URL + "prestataires", {
  //     headers: { Authorization: token },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setPrestataires(data))
  //     .catch((err) => console.error(err));
  // };
  // fetch(SERVER_URL + "prestataires", {  /notEvent/${idE}
  const fetchPrestataires = (idE) => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `prestataires/notEvent/${idE}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data); // Ajoutez cette ligne pour voir les données dans la console
        setPrestataires(data);
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  // const
  const fetchEvents = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `event/org/${sessionStorage.getItem("UserMail")}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setEvents(data));
    // .catch((err) => console.error(err));
    // console.log(token);
    sessionStorage.setItem("nbEvent", events.length);
  };

  const addEvent = (event) => {
    // event.prestataires = selectedPrestataires;
    fetch(SERVER_URL + "event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (response.ok) {
          fetchEvents();
          // setSelectedPrestataires([]); // Clear selected prestataires after adding the event
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };
  function removeSubString(mainString, subString) {
    // Utilisation de la méthode replace
    // let nouvelleChaine = mainString.replace(subString, "");

    // Utilisation de découpage et de concaténation
    let debut = mainString.indexOf(subString);
    let fin = debut + subString.length;
    let nouvelleChaine = mainString.slice(0, debut) + mainString.slice(fin);
    console.log(nouvelleChaine);
    return nouvelleChaine;
  }
  const estPresent = (T, sT) => {
    console.log(T.includes(sT));
    return T.includes(sT);
  };
  const annulerChoixPrestataire = (idp, e) => {
    // if (estPresent(ListSelected, `[${e}, ${idp}]`) === true) {
    const token = sessionStorage.getItem("jwt");
    let g = 0;
    fetch(SERVER_URL + `demandes/${e}/${idp}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(SERVER_URL + `api/demandes/${data.idDemande}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: token },
          // body: "{}",
        })
          .then((response) => {
            if (response.ok) {
              alert("Prestation annulee");
              setListSelected(removeSubString(ListSelected, `[${e}, ${idp}]`));
              console.log(ListSelected);
              fetchPrestataires(e);
              fetch(SERVER_URL + `demandes/${e}/${idp}`, {
                headers: { Authorization: token },
              })
                .then((response) => response.json())
                .then((data) => setIdD(data.idDemande))
                .catch((err) => console.log(err));
              // console.log(idD);
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => console.error(err));
      })
      .then((data) => setIdD(data.idDemande))
      .catch((err) => console.log(err));
    // console.log(idD);
    // } else {
    //   alert("Prestataire inexistant");
    // }
  };

  const choisirPrestataire = (idp, e) => {
    if (estPresent(ListSelected, `[${e}, ${idp}]`) === false) {
      // ListSelected.push(ListSelected.push([e, idp]));
      // ListSelected += `[${e}, ${idp}]`;
      setListSelected(ListSelected + `[${e}, ${idp}]`);
      setClick(true);
      const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + `demandes/${e}/${idp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: "{}",
      })
        .then((response) => {
          if (response.ok) {
            // fetchEvents();
            // setSelectedPrestataires([]); // Clear selected prestataires after adding the event
            // ListSelected.push([e, idp]);
            console.log(ListSelected);
            fetchPrestataires(e);
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("Prestataire deja selectionne");
      setClick(false);
    }
  };
  const ajoutPrestataire = (e) => {
    SetEstSelected(true);
    fetchPrestataires(e);
    setOpen2(true);
  };
  const voirPrestataire = (e) => {
    SetEstSelected2(true);
    prestatairesSelonEvent(e);
    setOpen3(true);
  };
  const handleClickSelect = (event) => {
    setSelectedValue(event.target.value);
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

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPrestataires, setSelectedPrestataires] = useState(null);

  const handleClickEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  // const handlePrestataireSelection = (prestataire, e) => {
  //   setSelectedPrestataires((prevSelected) => [...prevSelected, prestataire]);
  //   choisirPrestataire(prestataire, selectedEvent);
  // };
  const dialogStyle = {
    backgroundColor: "skyblue",
    width: "90%",
    padding: "20px",
    color: "white",
    borderRadius: "12px",
    margin: "50px auto",
  };
  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: 0,
      margin: "0 auto",
    },
    thead: {
      background: "#eee",
      fontWeight: "bold",
    },
    th: {
      padding: 10,
      border: "1px solid #ccc",
      textAlign: "left",
    },
    td: {
      padding: 10,
      border: "1px solid #ccc",
      textAlign: "left",
    },
    img: {
      width: 100,
      height: "auto",
    },
    // .prestataire-details: {
    //   maxWidth: 600,
    //   margin: '0 auto',
    // },
    // .selection-button: {
    //   margin: '10px 0',
    // },
  };
  const prestatairesSelonEvent = (idE) => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `prestataires/byEvent/${idE}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data); // Ajoutez cette ligne pour voir les données dans la console
        setPrestataires(data);
      })
      .catch((err) => console.error(err));
  };
  const tabImage = [
    "https://i.ytimg.com/vi/asqojHCK8cU/maxresdefault.jpg",
    "https://www.webmarketing-com.com/wp-content/uploads/2022/05/faire-appel-a-une-agence-evenement-1.jpg",
    "https://areabox.fr/documents-images/Untitled-3.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWbhUNzmjLcoqISEVP6dlfnpTVl5q0icTt1w&usqp=CAU",
    "https://lkb-blog-images.linkaband.com/blog-musique/partenariat/agence-evenementiel-toulouse/10468-thumbnail-resized-BLOG_PAGE_THUMBNAIL.jpg",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFsJRStmL9O8eJHfr-wUCu4l-sQocYQfhZ0NHWqtKPNLvCY7pthZj9vc4U3adNRW21G6Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pB775h2TyS6gg_5GeGAoB_RhHZdl_SMkQt8ToxDoIqGndlzGE5p2ZlM5klwnTiCs768&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmry-5jwfTCx-_nt5GGQbsBNxnrVUlgCag66zb4zJJ7arIvNltPgbrgUoBeh5avfptSkc&usqp=CAU",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
  ];

  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Stack mt={2} mb={2}>
        <AddEvent addEvent={addEvent} />

        <Stack mt={-4} mb={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              color="primary"
              disabled={false}
              placeholder="Rechercher un événement"
              size="md"
              variant="solid"
              onChange={handleSearchChange}
              sx={{ marginRight: 2, marginLeft: 2 }}
              endAdornment={
                <IconButton
                  color="primary"
                  size="small"
                  icon={<SearchIcon />}
                />
              }
            />

            <Select
              color="primary"
              placeholder="Trier par événement ..."
              size="sm"
              value={selectedValue}
              onChange={handleClickSelect}
              // sx={{ marginRight: "auto", flexShrink: 0 }}
              defaultValue="Tous les événements"
              sx={{
                marginRight: "auto",
                flexShrink: 0,
                maxWidth: "3000px",
                maxHeight: "30px",
              }}
            >
              <MenuItem value="">Tous les événements</MenuItem>
              {events.map((event) => (
                <MenuItem key={event.nomEvent} value={event.nomEvent}>
                  {event.nomEvent}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
      </Stack>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {events
          .filter((event) =>
            event.nomEvent.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((event) =>
            // selectedValue === "" ? true : event.value === selectedValue
            event.nomEvent.toLowerCase().includes(selectedValue.toLowerCase())
          )
          .map((event) => (
            <Card key={event.idEvent} style={{ margin: "16px", width: 300 }}>
              <CardMedia
                component="img"
                height="200"
                image={tabImage[Math.floor(Math.random() * tabImage.length)]} // Remplacez par l'URL de l'image de la voiture
                alt={event.nomEvent}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {event.nomEvent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lieu : {event.lieu}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Organisateur : {event.organisateur.mail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date : {toDateFr(event.date)}
                </Typography>

                <button
                  className="profile-card__button button--blue js-message-btn "
                  onClick={() => {
                    handleClickEvent(event);
                  }}
                >
                  GERER{" "}
                </button>
              </CardContent>
            </Card>
            // </Link>
          ))}
      </div>

      {selectedEvent && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>{selectedEvent.nomEvent}</DialogTitle>
          <DialogContent>
            <table>
              <thead>
                <tr>
                  <th>
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        "data:image/jpeg;base64,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"
                      }
                      alt={selectedEvent.nomEvent}
                    />
                  </th>
                  <th>
                    <Stack spacing={2} sx={{ maxWidth: 600 }}>
                      <SnackbarContent
                        message={`Lieu : ${selectedEvent.lieu}`}
                      />
                      <SnackbarContent
                        message={`Organisateur : ${selectedEvent.organisateur.mail}`}
                      />
                      <SnackbarContent
                        message={`Date : ${toDateFr(selectedEvent.date)}`}
                      />
                      {/* <SnackbarContent message={`Plus de details : $}`} /> */}
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          ajoutPrestataire(selectedEvent.idEvent);
                        }}
                      >
                        Ajouter des prestataires
                      </Button>
                      <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                          voirPrestataire(selectedEvent.idEvent);
                        }}
                      >
                        Voir mes prestataires
                      </Button>
                      {estSelected && (
                        <Dialog
                          open={open2}
                          onClose={handleClose2}
                          // fullWidth
                          maxWidth="md"
                          fullScreen
                          style={dialogStyle}
                        >
                          <DialogTitle>
                            <h1>Les Prestataires Disponibles</h1>
                          </DialogTitle>
                          <DialogContent>
                            <table sx={styles.table}>
                              <thead>
                                <tr>
                                  <th sx={styles.th}>Image</th>
                                  <th sx={styles.th}>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {prestataires.map((prest) => (
                                  <tr key={prest.idp}>
                                    <td sx={styles.td}>
                                      <CardMedia
                                        component="img"
                                        height="280"
                                        width="100"
                                        image={
                                          prest.photo == null
                                            ? "https://animations-innovantes.fr/wp-content/uploads/2019/02/Social-Wall-Digital.jpg"
                                            : `${SERVER_URL}` +
                                              `prestataires/${prest.photo}`
                                        }
                                        alt={prest.nom}
                                      />
                                    </td>
                                    <td sx={styles.td}>
                                      <Stack spacing={1} sx={{ maxWidth: 600 }}>
                                        <SnackbarContent
                                          message={`Nom : ${prest.nom}`}
                                        />
                                        <SnackbarContent
                                          message={`Prenom : ${prest.prenom}`}
                                        />
                                        <SnackbarContent
                                          message={`Mail : ${prest.mail}`}
                                        />
                                        <SnackbarContent
                                          message={`Service : ${prest.service}`}
                                        />
                                        <SnackbarContent
                                          message={
                                            prest.note ? (
                                              <div>
                                                Note :{" "}
                                                <RatingStars
                                                  rating={prest.note}
                                                />
                                              </div>
                                            ) : (
                                              ""
                                            )
                                          }
                                        />
                                        {!estPresent(
                                          ListSelected,
                                          `[${selectedEvent.idEvent}, ${prest.idp}]`
                                        ) ? (
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              choisirPrestataire(
                                                prest.idp,
                                                selectedEvent.idEvent
                                              );
                                              // setClick(true);
                                            }}
                                          >
                                            Selectionner
                                          </Button>
                                        ) : (
                                          <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => {
                                              annulerChoixPrestataire(
                                                prest.idp,
                                                selectedEvent.idEvent
                                              );
                                              // setClick(false);
                                            }}
                                          >
                                            Annuler
                                          </Button>
                                        )}
                                      </Stack>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={handleClose2}
                              className="profile-card__button button--orange "
                            >
                              Fermer
                            </Button>
                          </DialogActions>
                        </Dialog>
                      )}
                      {estSelected2 && (
                        <Dialog
                          open={open3}
                          onClose={handleClose3}
                          // fullWidth
                          maxWidth="md"
                          fullScreen
                          style={dialogStyle}
                        >
                          <DialogTitle>
                            <h1>Les Prestataires Engages qui ont accepte</h1>
                          </DialogTitle>
                          <DialogContent>
                            <table sx={styles.table}>
                              <thead>
                                <tr>
                                  <th sx={styles.th}>Image</th>
                                  <th sx={styles.th}>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {prestataires.map((prest) => (
                                  <tr key={prest.idp}>
                                    <td sx={styles.td}>
                                      <CardMedia
                                        component="img"
                                        height="200"
                                        image={
                                          prest.photo == null
                                            ? "https://animations-innovantes.fr/wp-content/uploads/2019/02/Social-Wall-Digital.jpg"
                                            : `${SERVER_URL}` +
                                              `prestataires/${prest.photo}`
                                        }
                                        alt={prest.nom}
                                      />
                                    </td>
                                    <td sx={styles.td}>
                                      <Stack spacing={1} sx={{ maxWidth: 600 }}>
                                        <SnackbarContent
                                          message={`Nom : ${prest.nom}`}
                                        />
                                        <SnackbarContent
                                          message={`Prenom : ${prest.prenom}`}
                                        />
                                        <SnackbarContent
                                          message={`Mail : ${prest.mail}`}
                                        />
                                        <SnackbarContent
                                          message={`Service : ${prest.service}`}
                                        />

                                        {/* <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              choisirPrestataire(
                                                prest.idp,
                                                selectedEvent.idEvent
                                              );
                                              // setClick(true);
                                            }}
                                          >
                                            Selectionner
                                          </Button> */}
                                      </Stack>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              color="error"
                              className="profile-card__button button--orange "
                              variant="contained"
                              onClick={handleClose3}
                            >
                              Fermer
                            </Button>
                          </DialogActions>
                        </Dialog>
                      )}
                    </Stack>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              className="profile-card__button button--orange "
              variant="contained"
              onClick={handleClose}
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default EventListByClient;
