import "./App.css";
import About from "./components/About";
// import EventList from "./components/EventList";
// import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/" element={<EventList />} /> */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
