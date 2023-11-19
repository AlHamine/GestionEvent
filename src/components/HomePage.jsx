import React from "react";
import Animefront from "./Animefront.json";
import Lottie from "lottie-react";

function HomePage() {
  return (
    <div>
      <div
        style={{ display: "flex", boxShadow: "0px 5px 10px rgba(0, 0, 0, 2)" }}
      >
        <div style={{ flex: 1, marginTop: "50px", marginBottom: "40px" }}>
          {/* Contenu texte à gauche */}
          <h1 style={{ color: "blue", textAlign: "#1b06f1" }}>
            Gerer vos evenements facilement.
          </h1>
          <p style={{ lineHeight: "2", color: "#776af5" }}>
            {" "}
            Oraniser ou prester un evenement n'a jamais <br /> ete si facile
            avec votre plateforme EVENT-PRO
          </p>
        </div>
        <div style={{ flex: 1, marginTop: "50px", marginBottom: "40px" }}>
          <Lottie animationData={Animefront} />{" "}
        </div>
      </div>

      <div
        style={{ display: "flex", boxShadow: "0px 5px 10px rgba(0, 0, 0, 2)" }}
      >
        <div style={{ flex: 1 }}>
          {/* Contenu texte à gauche */}
          <h1 style={{ color: "blue", textAlign: "#1b06f1" }}>
            À PROPOS DE NOUS
          </h1>
          <p style={{ lineHeight: "2", color: "#776af5" }}>
            Kopar Express est une fintech créée par des sénégalais qui regroupe
            sur une seule plateforme des services de rechargement téléphonique,
            d'abonnement de forfait mobile, de financement participatif en ligne
            (collecte de fonds, tontine) et de paiements de facture, de
            scolarité et de salaire.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          {/* Image à droite */}
          <img
            src="https://media.istockphoto.com/id/974238866/photo/audience-listens-to-the-lecturer-at-the-conference.jpg?s=612x612&w=0&k=20&c=p_BQCJWRQQtZYnQlOtZMzTjeB_csic8OofTCAKLwT0M="
            alt="Description de l'image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 1)",
          backgroundColor: "#f2f1f8",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Contenu texte à gauche */}
          <h1 style={{ color: "blue", textAlign: "#1b06f1" }}>
            À PROPOS DE NOUS
          </h1>
          <p style={{ lineHeight: "2", color: "#776af5" }}>
            Kopar Express est une fintech créée par des sénégalais qui regroupe
            sur une seule plateforme des services de rechargement téléphonique,
            d'abonnement de forfait mobile, de financement participatif en ligne
            (collecte de fonds, tontine) et de paiements de facture, de
            scolarité et de salaire.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          {/* Image à droite */}
          <img
            src="https://img.freepik.com/free-vector/festive-calendar-event-holiday-celebration-party-work-schedule-planning-project-management-deadline-idea-office-managers-excited-colleagues_335657-1610.jpg"
            alt="Description de l'image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
