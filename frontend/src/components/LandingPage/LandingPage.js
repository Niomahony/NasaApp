import React from "react";
import { motion } from "framer-motion";
import { Rocket, Star, Globe, Camera, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../../App.css";

function LandingPage() {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Astronomy Picture of the Day",
      description:
        "Discover stunning daily images from space with detailed explanations",
      link: "/picture-of-the-day",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Mars Rover Photos",
      description: "Explore the Red Planet through the eyes of NASA's rovers",
      link: "/mars-photos",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Near Earth Objects",
      description: "Track asteroids and comets that pass near our planet",
      link: "/neo",
    },
  ];

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Explore the Universe
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Journey through NASA's vast collection of space data, images, and
            discoveries
          </motion.p>
          <motion.button
            className="cta-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Exploring
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Discover NASA's Amazing Data
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Link to={feature.link} className="feature-link">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="stat-number">140,000+</h3>
              <p className="stat-label">Images Available</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="stat-number">25+</h3>
              <p className="stat-label">Years of Data</p>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Free Access</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; NASA Data Explorer. Built using NASA's Open APIs</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
