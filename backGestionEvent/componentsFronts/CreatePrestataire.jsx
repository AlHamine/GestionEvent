import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import "../index.css";
import { Stack } from "@mui/material";
import AddPrestataire from "./AddPrestataire.jsx";

export default function PrestataireList() {
  const [prestataires, setPrestataires] = useState([]);
  useEffect(() => {
    fetchPrestataires();
  }, []);

  const fetchPrestataires = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/prestataires", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setPrestataires(data._embedded.prestataires))
      .catch((err) => console.error(err));
  };
  const addPrestataire = (prestataire) => {
    fetch(SERVER_URL + "prestataires", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(prestataire),
    })
      .then((reponse) => {
        if (reponse.ok) {
          fetchPrestataires();
        } else alert("Something went wrong !");
      })
      .catch((err) => console.error(err));
  };
  return (
    <Stack mt={2} mb={2}>
      <AddPrestataire addPrestataire={addPrestataire} />
    </Stack>
  );
}
