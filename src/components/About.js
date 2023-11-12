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

function About() {
  return (
    <div>
      <AppBar position="relative" sx={{ textAlign: "center" }}>
        <Container maxWidth="xl">
          {/* <Toolbar disableGutters>
            <h1>A Propos</h1>
          </Toolbar>
          <table>
            <tr>
              <th>
                <h2>À propos de nous</h2>
                <p>
                  Welcome to our website! We are a passionate team dedicated to
                  providing you with the best products and services.
                </p>
              </th>
              <th>
                <h2>À propos de nous</h2>
                <p>
                  Our mission is to make your life better by offering
                  high-quality products and exceptional customer service.
                </p>
              </th>
              <th>
                <h2>Social Network</h2>
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
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </table> */}
          <table className="table">
            <thead>
              <tr>
                <th>
                  <Link href="/" passHref>
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
                <th>Products</th>
                <th>DEVELOPERS</th>
                <th>COMPANY</th>
                <th>LEGAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>

                <td></td>
                <td>Components</td>
                <td>Documentation</td>
                <td>About</td>
                <td>Terms</td>
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
                <td>Pricing</td>

                <td>Discord serveur</td>
                <td>Careers</td>
                <td>Privacy</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>{/* <td colspan="3">Pied de page</td> */}</tr>
              <tr></tr>
            </tfoot>
          </table>
        </Container>
      </AppBar>
    </div>
  );
}

export default About;
