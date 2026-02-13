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
import SendIcon from "@mui/icons-material/Send";
const MessagePerso = ({destinataire}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [mail, setMail] = useState("");

  // const handleMailChange = (e) => {
  //   setMail(e.target.value);
  // };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  // const fetchMessages=()=>{
  //   const token = sessionStorage.getItem("jwt");
  //   fetch(SERVER_URL + `messages/${sessionStorage.getItem("UserMail")}`, {
  //     headers: { Authorization: token },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setMessages(data))
  //     .catch((err) => console.error(err));
  //   console.log(token);
  // };

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
    fetch(
      SERVER_URL +
        `messages/${sessionStorage.getItem("UserMail")}/${destinataire}`,
      {
        headers: { Authorization: token },
      }
    )
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
  const sendMessage = () => {
    const bataxal = {
      source: sessionStorage.getItem("UserMail"),
      dest: destinataire,
      message: message,
    };
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + `messages/${destinataire}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(bataxal),
    })
      .then((response) => {
        if (response.ok) {
          fetchMessages();
          setMessage("");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
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
                style={msg.source === destinataire ? style2 : style1}
                primary={
                  <Typography variant="subtitle1" gutterBottom>
                    {msg.dest || "Unknown User"}
                  </Typography>
                }
                secondary={`${msg.message}\n\n${toDateFr(msg.timestamp)}`}
                secondaryTypographyProps={{ style: { whiteSpace: "pre-line" } }}
              />
            </ListItem>
          ))}
        </List>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="message"
          label="Message"
          variant="standard"
          value={message}
          onChange={handleMessageChange}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
};
export default MessagePerso;
