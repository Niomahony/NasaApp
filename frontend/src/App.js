import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import LandingPage from "./components/LandingPage/LandingPage";
import PictureOfTheDay from "./components/PictureOfTheDay/PictureOfTheDay";
import "./App.css";

// Navigation Header Component
function NavigationHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPictureOfTheDay = location.pathname === "/picture-of-the-day";

  return (
    <motion.header
      className="navigation-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Home className="w-6 h-6" />
            <span>NASA Explorer</span>
          </motion.div>
        </Link>

        {isPictureOfTheDay && (
          <span
            className="apod-title"
            style={{ margin: 0, flex: 1, textAlign: "center" }}
          >
            Astronomy Picture of the Day
          </span>
        )}

        {!isHome && (
          <motion.div
            className="nav-back"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/" className="back-button">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/picture-of-the-day" element={<PictureOfTheDay />} />
          <Route
            path="/mars-photos"
            element={
              <div className="coming-soon">Mars Photos - Coming Soon!</div>
            }
          />
          <Route
            path="/neo"
            element={
              <div className="coming-soon">
                Near Earth Objects - Coming Soon!
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
