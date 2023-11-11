import "./App.css";
import About from "./components/About";
import { useState } from "react";
import EventList from "./components/EventList";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Logouter from "./components/Logout";

function App() {
  const [estAuthentifie, setEstAuthentifie] = useState(false);
  // const onLogout = () => {

  //   setEstAuthentifie(false);
  // };

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
                <EventList />
                <About />
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
      </Routes>
    </Router>
  );
}

export default App;
