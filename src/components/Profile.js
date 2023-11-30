import React from "react";
import "./UserProfile.css";
import { SERVER_URL } from "../constants.js";
const Profile = () => {
  let im = "";
  if (sessionStorage.getItem("role") == "client")
    im = `${SERVER_URL}` + `prestataires/${sessionStorage.getItem("photo")}`;
  else im = `${SERVER_URL}` + `client/${sessionStorage.getItem("photo")}`;

  return (
    <div className="wrapper">
      <div className="profile-card js-profile-card">
        <div className="profile-card__img">
          <img
            src={
              sessionStorage.getItem("photo") == null
                ? "data:image/jpeg;base64,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"
                : { im }
            }
            alt="profile card"
          />
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">
            {sessionStorage.getItem("p")} {sessionStorage.getItem("n")}
          </div>
          <div className="profile-card__txt">
            {sessionStorage.getItem("UserMail")} {"-->"}{" "}
            <strong>je suis {sessionStorage.getItem("role")}</strong>
          </div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__icon">
              <svg className="icon">
                <use xlinkHref="#icon-location"></use>
              </svg>
            </span>
            {sessionStorage.getItem("role") === "client" ? (
              <span className="profile-card-loc__txt">
                Nombre d'evenement organise: {sessionStorage.getItem("nbEvent")}
              </span>
            ) : (
              <div>
                <span className="profile-card-loc__txt">
                  Service:{sessionStorage.getItem("service")}
                </span>
                <br></br>
                <span className="profile-card-loc__txt">
                  Nombre de prestations : {sessionStorage.getItem("nbDemande")}
                </span>
              </div>
            )}
          </div>

          <div className="profile-card-inf">
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">1598</div>
              <div className="profile-card-inf__txt">Followers</div>
            </div>
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">65</div>
              <div className="profile-card-inf__txt">Following</div>
            </div>
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">123</div>
              <div className="profile-card-inf__txt">Articles</div>
            </div>
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">85</div>
              <div className="profile-card-inf__txt">Works</div>
            </div>
          </div>

          <div className="profile-card-social">
            <a
              href="https://www.facebook.com/iaMuhammedErdem"
              className="profile-card-social__item facebook"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-facebook"></use>
                </svg>
              </span>
            </a>
            <a
              href="https://twitter.com/iaMuhammedErdem"
              className="profile-card-social__item twitter"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-twitter"></use>
                </svg>
              </span>
            </a>
            <a
              href="https://www.instagram.com/iamuhammederdem"
              className="profile-card-social__item instagram"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-instagram"></use>
                </svg>
              </span>
            </a>
            <a
              href="https://www.behance.net/iaMuhammedErdem"
              className="profile-card-social__item behance"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-behance"></use>
                </svg>
              </span>
            </a>
            <a
              href="https://github.com/muhammederdem"
              className="profile-card-social__item github"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-github"></use>
                </svg>
              </span>
            </a>
            <a
              href="https://codepen.io/JavaScriptJunkie"
              className="profile-card-social__item codepen"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-codepen"></use>
                </svg>
              </span>
            </a>
            <a
              href="http://muhammederdem.com.tr/"
              className="profile-card-social__item link"
              target="_blank"
            >
              <span className="icon-font">
                <svg className="icon">
                  <use xlinkHref="#icon-link"></use>
                </svg>
              </span>
            </a>
          </div>

          <div className="profile-card-ctr">
            <button className="profile-card__button button--blue js-message-btn">
              Message
            </button>
            {sessionStorage.getItem("role") === "client" && (
              <button className="profile-card__button button--orange">
                Noter les prestations
              </button>
            )}
            <button
              className="profile-card__button button--blue js-message-btn"
              onClick={() => {
                // Supprimez le jeton JWT du stockage local
                localStorage.removeItem("jwtToken");
                sessionStorage.removeItem("role");
                sessionStorage.clear();
                // Redirigez l'utilisateur vers la page de connexion
                window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
              }}
            >
              Deconnexion
            </button>
          </div>
        </div>

        <div className="profile-card-message js-message">
          <form className="profile-card-form">
            <div className="profile-card-form__container">
              <textarea placeholder="Say something..."></textarea>
            </div>
            <div className="profile-card-form__bottom">
              <button className="profile-card__button button--blue js-message-close">
                Send
              </button>
              <button className="profile-card__button button--gray js-message-close">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
