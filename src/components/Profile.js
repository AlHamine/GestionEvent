// import React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

// function Profile() {
//   // Récupérer le token JWT depuis le stockage local (localStorage)
//   const token = localStorage.getItem("token");

//   // Vérifier si le token est présent
//   if (token) {
//     // Décodez le token JWT pour obtenir les informations utilisateur
//     const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage de la partie payload du token

//     // Maintenant, vous avez accès aux informations de l'utilisateur
//     const userId = decodedToken.sub; // ID de l'utilisateur
//     const username = decodedToken.username; // Nom d'utilisateur
//     const userRole = decodedToken.role; // Rôle de l'utilisateur
// return (
//   <Card variant="outlined">
//     <CardContent>
//       <Typography variant="h5" component="div">
//         User Profile
//       </Typography>
//       <Typography color="textSecondary">Name: {username}</Typography>
//       <Typography color="textSecondary">Email: {username}</Typography>
//       <Typography color="textSecondary">Role: {userRole}</Typography>

//       <Typography color="textSecondary">Location: City, Country</Typography>
//       <Typography color="textSecondary">
//         Interests: Web Development, Design, Hiking
//       </Typography>
//     </CardContent>
//   </Card>
// );
//     // Utilisez ces informations comme bon vous semble dans votre application React
//   } else {
//     return (
//       <div>
//         <h1>Rien a faire</h1>
//       </div>
//     )
//     // L'utilisateur n'est pas connecté
//   }

// }

// export default Profile;
import React from "react";
import { Link } from "react-router-dom"; // Si vous utilisez React Router pour la navigation
// import jwt from "jsonwebtoken"; // Importez la bibliothèque jsonwebtoken

function Profile() {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken  = JSON.parse(atob(token.split(".")[1])); // Décodage de la partie payload du token
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
