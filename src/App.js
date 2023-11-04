import "./App.css";
import About from "./components/About";
import EventList from "./components/EventList";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<EventList />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      <About />
    </Router>
  );
}

export default App;
