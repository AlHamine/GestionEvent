import React from "react";
import { Logout } from "@mui/icons-material";
function Logouter() {
  // Fonction de déconnexion
  const handleLogout = () => {
    // Supprimez le jeton JWT du stockage local
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("n");
    sessionStorage.removeItem("p");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("idClient");
    sessionStorage.removeItem("UserMail");
    sessionStorage.removeItem("client");
    // sessionStorage.clear();
    // Redirigez l'utilisateur vers la page de connexion
    window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
  };

  return (
    <div>
      <button onClick={handleLogout}>
        <Logout color="warning"></Logout>
        Déconnexion
      </button>
    </div>
  );
}

export default Logouter;
