import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import "../index.css";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddEvent from "./AddEvent.js";

function EventList() {
  const [events, setEvents] = useState([]);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch(SERVER_URL + "api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data._embedded.events))
      .catch((err) => console.error(err));
  };

  const addEvent = (event) => {
    fetch(SERVER_URL + "api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (response.ok) {
          fetchEvents();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddEvent addEvent={addEvent} />
      </Stack>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {events.map((event) => (
          <Card key={event.id} style={{ margin: "16px", width: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image={"../images/img.jpg"} // Remplacez par l'URL de l'image de la voiture
              alt={event.nom}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {event.brand} {event.categorie}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Année : {event.year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lieu : {event.lieu}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date : {event.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
}

export default EventList;
