import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";

function EventDetails(props) {
  //   console.log("Details : " + props);
  const [event, setEvent] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/evenements/{props.id}", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setEvent(data._embedded.evenements))
      .catch((err) => console.error(err));
    console.log(token);
  };
  return (
    <div>
      <h1>{event.nomEvent}</h1>
      <p>Lieu : {event.lieu}</p>
      <p>Organisateur : {event.organisateur}</p>
      <p>Date : {event.date}</p>
    </div>
  );
}

export default EventDetails;
