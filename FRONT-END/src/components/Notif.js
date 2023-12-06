import React, { useState, useEffect,useRef } from "react";
import { SERVER_URL } from "../constants.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

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
import MessagePerso from "./MessagePerso.js";

const NotifComponent = () => {
  const [messages, setMessages] = useState([]);
  const [openx, setOpenx] = useState(false);
  const [dest, setDest] = useState("");
  const lastListItemRef = useRef(null);
  const handleClosex = () => {
    setOpenx(false);
  };
  const handleClickOpenx = (mail) => {
    setDest(mail);
    setOpenx(true);
  };

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
      .then((data) => setMessages(data.reverse()))
      .catch((err) => console.error(err));
    console.log(token);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Mettre à jour l'état ou effectuer d'autres actions
      fetchMessages();
      if (lastListItemRef.current) {
        lastListItemRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [messages]);
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
            <ListItem
              key={index}
              ref={index === messages.length - 1 ? lastListItemRef : null}
            >
              <ListItemAvatar>
                <Avatar>{msg.source ? msg.dest.charAt(0) : ""}</Avatar>
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
              <button
                className="profile-card__button button--blue js-message-btn"
                onClick={() => {
                  // alert("clicked");
                  handleClickOpenx(msg.source);
                }}
              >
                Repondre
              </button>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog
        open={openx}
        onClose={handleClosex}
        fullWidth
        maxWidth="sm"
        // sx={{ width: "100%", position: "absolute", right: 0, height: "100%" }}
        // sx={{ position: "absolute", right: 80, top: 8 }}
      >
        <DialogTitle>
          <div
            style={
              {
                // position: "absolute",
                // left: "35%",
              }
            }
          >
            Discussion avec {dest}
            <MessagePerso destinataire={dest} />
            {/* <ChatComponent/> */}
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};
export default NotifComponent;
