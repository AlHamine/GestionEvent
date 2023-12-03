import "./App.css";
import { useState } from "react";
import EventList from "./components/EventList";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Logouter from "./components/Logout";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import PrestataireList from "./components/PrestataireList";
import EventListByClient from "./components/EventListByClient";
import ResponsiveAppBarNotConnected from "./components/ResponsiveAppBarNotConnected";
import HomePageConnected from "./components/HomePageConnected";
import Propos from "./components/Propos";
import DemandeList from "./components/DemandeList";
import ReviewForm from "./components/ReviewForm";
import CreatePrestataire from "./components/CreatePrestataire";
import AddPrestataire from "./components/AddPrestataire";
import AddCustomer from "./components/AddCustumer";
// import { useNavigate } from "react-router-dom";

function App(props) {
  const [estAuthentifie, setEstAuthentifie] = useState(false);
  // const onLogout = () => {

  //   setEstAuthentifie(false);
  // };
  console.log(props.id);
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removetItem("isLoggedIn");
    // Mettez à jour isAuthenticated avec la nouvelle valeur (false pour la déconnexion)
    setEstAuthentifie(false);
  };
  // const navigate = useNavigate();

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/" element={<EventList />} /> */}
        <Route
          path="/"
          element={
            sessionStorage.getItem("isLoggedIn") ? (
              <div>
                {/* <ResponsiveAppBar /> */}
                {/* <HomePageConnected /> */}
                {sessionStorage.getItem("role") === "client" ? (
                  <div>
                    <EventList></EventList>
                  </div>
                ) : (
                  <DemandeList />
                )}

                {/* <Footer /> */}
              </div>
            ) : (
              <div>
                <ResponsiveAppBarNotConnected />
                <HomePage />

                <Footer />
              </div>
            )
          }
        />
        {/* <Route path="/about" element={<About />} /> */}
        <Route
          path="/login"
          element={
            <Login
              estAuthentifie={estAuthentifie}
              setEstAuthentifie={setEstAuthentifie}
            />
          }
        />
        <Route path="/logout" element={<Logouter />} action={handleLogout} />
        <Route path={"/events"} element={<EventList />} />;
        <Route path={"/prest"} element={<PrestataireList />} />;
        <Route path={"/myevents"} element={<EventListByClient />} />;
        <Route path={"/review"} element={<ReviewForm />} />;
        <Route path={"/addPrest"} element={<AddPrestataire />} />;
        <Route path={"/addCustom"} element={<AddCustomer />} />;
        <Route path={"/propos"} element={<Propos />} />;
      </Routes>
    </Router>
  );
}

export default App;
