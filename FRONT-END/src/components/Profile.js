import React from "react";
import "./UserProfile.css";
import { SERVER_URL } from "../constants.js";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import Footer from "./Footer.js";
import UpdatePrestataire from "./UpdatePrestataire.jsx";
import UpdateCustomer from "./UpdateCustomer.jsx";

const Profile = () => {
  let im = "";
  if (sessionStorage.getItem("role") == "client")
    im = `${SERVER_URL}` + `client/${sessionStorage.getItem("photo")}`;
  else im = `${SERVER_URL}` + `prestataires/${sessionStorage.getItem("photo")}`;
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img
              src={
                sessionStorage.getItem("photo") == "null"
                  ? `data:image/jpeg;base64,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`
                  : `${im}`
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
                  Nombre d'evenement organise:{" "}
                  {sessionStorage.getItem("nbEvent")}
                </span>
              ) : (
                <div>
                  <span className="profile-card-loc__txt">
                    Service:{sessionStorage.getItem("service")}
                  </span>
                  <br></br>
                  <span className="profile-card-loc__txt">
                    Nombre de prestations :{" "}
                    {sessionStorage.getItem("nbDemande")}
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
              {/* <button className="profile-card__button button--blue js-message-btn">
              Message
            </button> */}
              {sessionStorage.getItem("role") === "client" && (
                <>
                  <button
                    className="profile-card__button button--orange"
                    onClick={() => {
                      window.location.href = "/review";
                    }}
                  >
                    Noter les prestations
                  </button>
                  <UpdateCustomer />
                </>
              )}

              {sessionStorage.getItem("role") === "prestataire" && (
                <UpdatePrestataire />
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
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
