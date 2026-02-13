import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
// import Toolbar from "@mui/material/Toolbar";
import "../App.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DataArrayIcon from "@mui/icons-material/DataArray";
import AirlinesIcon from "@mui/icons-material/Airlines";

function Footer() {
  // console.log(typeof (n) + " " + n);
  return (
    <footer className="footer2" >
      {/* Liaison avec la single page ie avec les id a savoir veux, prest,event,propos */}
      <div>
        <AppBar position="relative" sx={{ textAlign: "center" }}>
          <Container maxWidth="xl">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <Link to="/" passHref>
                      <Button
                        as="a"
                        variant="text"
                        sx={{
                          mr: 2,
                          display: { xs: "none", md: "flex" },
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <DataArrayIcon />
                        EVENT-PRO
                        <AirlinesIcon />
                      </Button>
                    </Link>
                    <text>Votre satisfaction notre bien être</text>
                  </th>
                  <th></th>
                  <th>
                    <a style={{ color: "white" }} href="/propos/#veux">
                      Je veux...
                    </a>
                  </th>
                  <th>
                    <a style={{ color: "white" }} href="/propos/#propos">
                      À PROPOS DE NOUS
                    </a>
                  </th>
                  <th>
                    <a style={{ color: "white" }} href="/propos/#event">
                      L'événement
                    </a>
                  </th>
                  <th>
                    <a style={{ color: "white" }} href="/propos/#prest">
                      Préstation
                    </a>
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th>
                    {" "}
                    <a style={{ color: "white" }} href="/events">
                      Tous les evenements
                    </a>
                  </th>
                  <th></th>
                  <th>
                    <a style={{ color: "white" }} href="/prest">
                      Tous les prestataires
                    </a>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  {/* 
                  <td></td>
                  <td>Components</td>
                  <td>Documentation</td>
                  <td>About</td>
                  <td>Terms</td> */}
                </tr>
                <tr>
                  <td>
                    <div className="about-us-bar">
                      <div className="social-network-bar">
                        <div className="social-buttons">
                          <a href="https://www.instagram.com">
                            <InstagramIcon />
                          </a>
                          <a href="https://www.facebook.com">
                            <FacebookIcon />
                          </a>
                          <a href="https://www.whatsapp.com">
                            <WhatsAppIcon />
                          </a>
                          <a href="https://github.com/AlHamine/GestionEvent">
                            <GitHubIcon />
                          </a>
                          <a href="https://github.com/AlHamine/GestionEvent">
                            <LinkedInIcon />
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td></td>
                  {/* <td>Pricing</td>

                  <td>Discord serveur</td>
                  <td>Careers</td>
                  <td>Privacy</td> */}
                </tr>
              </tbody>
              <tfoot>
                <tr>{/* <td colspan="3">Pied de page</td> */}</tr>
                <tr></tr>
              </tfoot>
            </table>
            <hr style={{ color: "#bcb2fa", marginTop: "1  px" }} />
            <div
              style={{
                display: "center",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Copyright 2023 EVENT-PRO Tous droits réservés.
            </div>
          </Container>
        </AppBar>
      </div>
    </footer>
  );
}

export default Footer;
