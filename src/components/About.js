import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import "../App.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function About() {
  return (
    <div>
      <AppBar position="relative" sx={{ textAlign: "center" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <h1>A Propos</h1>
          </Toolbar>

          <div className="about-us-bar">
            <h2>À propos de nous</h2>
            <p>
              Welcome to our website! We are a passionate team dedicated to
              providing you with the best products and services.
            </p>
            <p>
              Our mission is to make your life better by offering high-quality
              products and exceptional customer service.
            </p>

            <div className="social-network-bar">
              <h2>Social Network</h2>
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
        </Container>
      </AppBar>
    </div>
  );
}

export default About;
