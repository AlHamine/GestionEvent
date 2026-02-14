import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import "../index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function CustomerList() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/clients", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setClients(data._embedded.clients))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {clients.map((client) => (
          <Card key={client.id} style={{ margin: "16px", width: 300 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {client.nom} {client.prenom}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                prenom : {client.prenom}
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                email : {client.mail}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}