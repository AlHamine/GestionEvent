import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import "../index.css";

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

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {prestataires.map((prestataire) => (
          <Card key={prestataire.id} style={{ margin: "16px", width: 300 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {prestataire.nom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                prenom : {prestataire.prenom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                email : {prestataire.mail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                service : {prestataire.service}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
