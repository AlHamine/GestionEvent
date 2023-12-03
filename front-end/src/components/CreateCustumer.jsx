import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import "../index.css";
import { Stack } from "@mui/material";
import AddCustomer from "./AddCustumer.jsx";

function CreateCustumer() {
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

  const addCustomer = (client) => {
    fetch(SERVER_URL + "client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((response) => {
        if (response.ok) {
          fetchClients();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Stack mt={2} mb={2}>
        <AddCustomer addCustomer={addCustomer} />
      </Stack>
    </div>
  );
}

export default CreateCustumer;
