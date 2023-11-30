import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../index.css";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Footer from "./Footer.js";
import CardMedia from "@mui/material/CardMedia";
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
      <ResponsiveAppBar />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {prestataires.map((prestataire) => (
          <Card key={prestataire.id} style={{ margin: "16px", width: 300 }}>
            <CardMedia
                                        component="img"
                                        height="200"
                                        image={
                                          prestataire.photo == null
                                            ? "https://animations-innovantes.fr/wp-content/uploads/2019/02/Social-Wall-Digital.jpg"
                                            : `${SERVER_URL}` +
                                              `prestataires/${prestataire.photo}`
                                        }
                                        alt={prestataire.nom}
                                      />
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
      {/* <br></br><br></br><br></br> */}
      <Footer />
    </>
  );
}
