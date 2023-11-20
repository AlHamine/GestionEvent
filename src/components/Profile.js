import React from "react";
import { Link } from "react-router-dom"; // Si vous utilisez React Router pour la navigation
// import jwt from "jsonwebtoken"; // Importez la bibliothèque jsonwebtoken

function Profile() {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage de la partie payload du token
    const nom = decodedToken.nom;
    const prenom = decodedToken.prenom;

    return (
      <div>
        <h1>User Profile</h1>
        <p>Nom : {nom}</p>
        <p>Prénom : {prenom}</p>
        {/* Autres informations de profil */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>User not logged in</h1>
        <p>
          Please <Link to="/">log in</Link> to access your profile.
        </p>
      </div>
    );
  }
}

export default Profile;
