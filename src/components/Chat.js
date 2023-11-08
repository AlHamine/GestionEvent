import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const ChatComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mail, setMail] = useState("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/websocket");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/messages", (message) => {
        const messageText = JSON.parse(message.body);
        // Gérez le message reçu ici (côté client)
        setMessages((prevMessages) => [...prevMessages, messageText]);
      });
    });
    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);
  const handleMailChange = (e) => {
    setMail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendtMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        mail,
        content: message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      sendtMessage("");
    }
  };

  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>msg.mail.charAt(0) </Avatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" gutterBottom>
                    msg.mail
                  </Typography>
                }
                secondary={msg.content}
              />
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="standard-basic"
          label="mail"
          variant="standard"
          value={mail}
        />
        <TextField
          id="standard-basic"
          label="message"
          variant="standard"
          value={message}
        />
        <Button
          variant="contained"
          onClick={sendtMessage}
          disabled={!message.trim()}
        >
          Envoyer
        </Button>
      </div>
      {/* <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={mail}
          onChange={handleMailChange}
          placeholder="Type your message..."
        />
        <button onClick={() => sendtMessage()}>Send</button>
      </div> */}
    </div>
  );
};

export default ChatComponent;
