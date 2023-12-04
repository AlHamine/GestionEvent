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
  CircularProgress,
} from "@mui/material";
import "./ChatInterface.css";

const ChatComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mail, setMail] = useState("");
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/websocket");
    const client = Stomp.over(socket);

    try {
      client.connect({}, () => {
        setConnecting(false);
        client.subscribe("/topic/messages", (message) => {
          const messageText = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, messageText]);
          console.log("machin" + messages);
        });
      });
      setStompClient(client);
    } catch (error) {
      console.error("Error connecting to STOMP:", error);
    }

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && message.trim()) {
      const chatMessage = {
        mail,
        content: message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      console.log(JSON.stringify(chatMessage));
      // setMessages((prevMessages) => [...prevMessages, JSON.stringify(chatMessage)]);
      setMessages((prevMessages) => [
        ...prevMessages,
      chatMessage,
      ]);
      setMessage("");
    } else {
      console.error("STOMP connection not yet established.");
    }
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      {connecting && <CircularProgress />}

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
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={!stompClient || !stompClient.connected}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
