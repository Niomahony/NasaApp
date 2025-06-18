import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Share2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import "./PictureOfTheDay.css";

function PictureOfTheDay() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchAPOD = async (date = null) => {
    setLoading(true);
    setError(null);

    try {
      const url = date ? `/api/nasa/apod?date=${date}` : `/api/nasa/apod`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            data.message ||
              "You have exceeded the NASA API rate limit. Please try again later."
          );
        } else {
          throw new Error(data.message || "Failed to fetch APOD");
        }
      }

      // Handle both single object and array responses
      const apodData = Array.isArray(data) ? data[0] : data;
      setApod(apodData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    fetchAPOD(newDate);
  };

  const handleShare = async () => {
    if (navigator.share && apod) {
      try {
        await navigator.share({
          title: apod.title,
          text: apod.explanation,
          url: apod.url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(apod?.url || "");
    }
  };

  const navigateDate = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);

    if (direction === "prev") {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }

    const formattedDate = newDate.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    fetchAPOD(formattedDate);
  };

  if (loading) {
    return (
      <div className="apod-container">
        <div className="loading-container">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p>Loading astronomy picture of the day for {selectedDate}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apod-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => fetchAPOD()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="apod-container">
      <motion.div
        className="apod-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="apod-header">
          <div className="date-navigation">
            <button
              onClick={() => navigateDate("prev")}
              className="nav-button"
              disabled={selectedDate === "1995-06-16"} // APOD started on this date
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-picker"
              max={new Date().toISOString().split("T")[0]}
              min="1995-06-16"
            />
            <button
              onClick={() => navigateDate("next")}
              className="nav-button"
              disabled={selectedDate === new Date().toISOString().split("T")[0]}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {apod && (
          <motion.div
            className="apod-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Image Section */}
            <div className="image-section">
              {apod.media_type === "video" ? (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="apod-video"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <motion.img
                  src={apod.url}
                  alt={apod.title}
                  className="apod-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  loading="lazy"
                />
              )}

              {/* Action Buttons */}
              <div className="image-actions">
                <a
                  href={apod.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button onClick={handleShare} className="action-button">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="content-section">
              <div className="apod-meta">
                <div className="date-display">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(apod.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {apod.copyright && (
                  <p className="copyright">© {apod.copyright}</p>
                )}
              </div>

              <h2 className="image-title">{apod.title}</h2>

              <p className="image-explanation">{apod.explanation}</p>

              {apod.hdurl && apod.media_type === "image" && (
                <a
                  href={apod.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hd-link"
                >
                  View in High Definition
                </a>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default PictureOfTheDay;
