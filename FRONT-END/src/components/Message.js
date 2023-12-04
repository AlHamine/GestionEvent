import React, {useState } from "react";
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

const MessageComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mail, setMail] = useState("");

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

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

  const fetchMessages = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(
      SERVER_URL + `messages/${sessionStorage.getItem("UserMail")}/${mail}`,
      {
        headers: { Authorization: token },
      }
    )
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
    console.log(token);
  };

  const sendMessage = () => {
    const bataxal = {
      source: sessionStorage.getItem("UserMail"),
      dest: mail,
      message: message,
    };
    fetch(SERVER_URL + `messages/${mail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bataxal),
    })
      .then((response) => {
        if (response.ok) {
          fetchMessages();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {<CircularProgress />}

      {messages.length !== 0 && (
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{msg.mail ? msg.mail.charAt(0) : ""}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" gutterBottom>
                    {msg.mail || "Unknown User"}
                  </Typography>
                }
                secondary={msg.content}
              />
            </ListItem>
          ))}
        </List>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="mail"
          label="Mail"
          variant="standard"
          value={mail}
          onChange={handleMailChange}
        />
        <TextField
          id="message"
          label="Message"
          variant="standard"
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={sendMessage}>
          Envoyer
        </Button>
      </div>
    </div>
  );
};
export default MessageComponent;
