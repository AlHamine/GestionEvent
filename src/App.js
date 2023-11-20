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
                <ResponsiveAppBar />
                {/* <EventList /> */}
                <HomePage />
                <Footer />
              </div>
            ) : (
              <Login
                estAuthentifie={estAuthentifie}
                setEstAuthentifie={setEstAuthentifie}
              />
            )
          }
        />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/logout" element={<Logouter />} action={handleLogout} />
        <Route path={"/events"} element={<EventList />} />;
      </Routes>
    </Router>
  );
}

export default App;
