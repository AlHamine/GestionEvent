import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants.js";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./ChatInterface.css";

const NotifComponent = () => {
  const [messages, setMessages] = useState([]);
  const style1 = {
    borderRadius: 30,
    padding: 40,
    background: "#2196F3", // Blue color
    color: "white", // Text color
    float: "left",
    // textAlign: "left",
  };
  const style2 = {
    borderRadius: 30,
    padding: 40,
    background: "#CCCCCC", // Gray color
    color: "black", // Text color
    float: "right",
  };
  const fetchMessages = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `messages/${sessionStorage.getItem("UserMail")}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
    console.log(token);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Mettre à jour l'état ou effectuer d'autres actions
      fetchMessages();
    }, 1000);
    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);
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

  return (
    <div>
      {<CircularProgress />}

      {messages.length !== 0 && (
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{msg.dest ? msg.dest.charAt(0) : ""}</Avatar>
              </ListItemAvatar>
              <ListItemText
                // style={msg.source === mail ? style2 : style1}
                primary={
                  <Typography variant="subtitle1" gutterBottom>
                    {msg.source || "Unknown User"}
                  </Typography>
                }
                secondary={`${msg.message}\n\n${toDateFr(msg.timestamp)}`}
                secondaryTypographyProps={{ style: { whiteSpace: "pre-line" } }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
export default NotifComponent;
