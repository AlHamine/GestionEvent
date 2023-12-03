import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import "../index.css";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Footer from "./Footer.js";

function DemandeList() {
  const [demandes, setDemandes] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Ajoutez cet état pour le terme de recherche
  const [selectedValue, setSelectedValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchDemandes();
  }, []);
  sessionStorage.setItem("nbDemande", 0);
  const contrat = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `demandes/contrat/${sessionStorage.getItem("UserMail")}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setDemandes(data))
      .catch((err) => console.error(err));
    
    console.log(token);
  sessionStorage.setItem("nbDemande", demandes.length);
  
}
  const fetchDemandes = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `demandes/${sessionStorage.getItem("UserMail")}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setDemandes(data))
      .catch((err) => console.error(err));
    console.log(token);
  };

  const repondreDemande = (demande, reponse) => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `api/demandes/${demande.idDemande}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
       body: JSON.stringify({ status: `${reponse}` }),
    })
      .then((response) => {
        if (response.ok) {
          fetchDemandes();
          fetch(SERVER_URL+`prestataires/event/${demande.prestataire.idp}/${demande.evenement.idEvent}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: "{}"
          })
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleClickSelect = (event) => {
    console.log(event.target.value);
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

  const handleClickEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  function image(){
  return image;
}
  
  if (demandes.length === 0)
    return (<React.Fragment>
      <ResponsiveAppBar />
      
      {/* <div className="image"></div> */}
              <CardMedia
                component="img"
                height="700"
                image="https://www.r2iimmobilier.fr/wp-content/uploads/2022/05/PTZ.jpg"
                alt="Pas de demande"
      />
      
      
      <Footer />
    </React.Fragment>)


  return (
    <React.Fragment >
       

      <ResponsiveAppBar />

      <div style={{ display: "flex", justifyContent: "flex-end" ,marginTop:"20px"}}>
        <Button
          className="profile-card__button button--blue js-message-btn "
          variant="contained"
          disableElevation
          onClick={() => { contrat() }}
          style={{ marginRight: "10px" }}
        >
          Voir les contrats
        </Button>
      </div>
      <br></br>
      
      <Stack mt={2} mb={2}>
        {/* <AddEvent addEvent={addEvent} /> */}
        {/* <HomePage addEvent={addEvent} /> */}
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
              <MenuItem value="">Tous les Status</MenuItem>
              {demandes.map((d) => (
                <MenuItem key={d.status} value={d.status}>
                  {d.status}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="profile-card__button button--blue js-message-btn "
          variant="contained"
          disableElevation
          onClick={() => { fetchDemandes() }}
          style={{ marginRight: "10px" }}
        >
          Voir tous demandes
        </Button>
      </div>
        </Stack>
      </Stack>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {demandes
          .filter((d) =>
            d.status.toLowerCase().includes(searchTerm.toLowerCase())
          )
          // .filter((d) =>
          //   // selectedValue === "" ? true : event.value === selectedValue
          //   d.evenement.nomEvent.toLowerCase().includes(selectedValue.toLowerCase())
          // )
          .map((d) => (
            // <Link
            //   key={event.idEvent} // Ajoutez une clé unique
            //   to={`/events/${idEventFuc(event._links.self.href)}`}
            //   onClick={() =>
            //     handleClickEvent(idEventFuc(event._links.self.href))
            //   }
            // >
            <Card key={d.idDemnde} style={{ margin: "16px", width: 300 }}>
              <CardMedia
                component="img"
                height="200"
                image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE7Q243b9-yn4NgELp6Njls0VQRUS_ZHvleRWI4vAONmg5wPN_aPMJePxt-27zY985crc&usqp=CAU"  
                }
                alt={d.idDemnde}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {d.evenement.nomEvent}
                  <Button
                    sx={{ marginLeft: "10px" }}
                    onClick={handleButtonClick}
                  >
                    {isClicked ? (
                      <FavoriteBorderIcon style={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nom : {d.evenement.lieu}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Organisateur : {d.client.mail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date : {toDateFr(d.evenement.date)}
                </Typography>
                {d.status === 'EN_ATTENTE' ? (<div>
                  <Button variant="contained" color="success" onClick={() => repondreDemande(d, "ACCEPTED")}>
                    Accepter
                  </Button>
                  <Button variant="contained" color="error" onClick={() => repondreDemande(d, "REFUSED")}>
                    Refuser
                  </Button>
                </div>
                ) : (<div>{(d.status === "ACCEPTED") ? <div> <CardMedia
                  component="img"
                  height="200"
                  image={"data:image/jpeg;base64,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"}
                  alt={d.idDemnde}
                /></div> : <div> <CardMedia
                  component="img"
                  height="200"
                  image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5yGvr5YTvswccJ2KXUI3HOYQEEOKqLlM9A&usqp=CAU  "}
                  
                  alt={d.idDemnde}
                /></div>}</div>)}
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
                        message={`Organisateur : ${selectedEvent.organisateur}`}
                      />
                      <SnackbarContent
                        message={`Date : ${selectedEvent.date}`}
                      />
                      <SnackbarContent message={`Plus de details : $}`} />
                    </Stack>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>plus de details</td>
                  <td>plus de ...</td>
                </tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fermer</Button>
          </DialogActions>
        </Dialog>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default DemandeList;
