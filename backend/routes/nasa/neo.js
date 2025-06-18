const express = require("express");
const axios = require("axios");
const router = express.Router();

const NASA_API_BASE = "https://api.nasa.gov";
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

const makeNasaRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${NASA_API_BASE}${endpoint}`, {
      params: {
        api_key: NASA_API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.code === "OVER_RATE_LIMIT"
    ) {
      error.isRateLimit = true;
    }
    console.error("NASA API Error:", error.response?.data || error.message);
    throw error;
  }
};

function handleNasaError(res, error, fallbackMsg) {
  if (error.isRateLimit) {
    return res.status(429).json({
      error: "Rate limit exceeded",
      message:
        error.response?.data?.error?.message ||
        "You have exceeded your rate limit. Try again later.",
    });
  }
  return res.status(500).json({
    error: fallbackMsg,
    message: error.response?.data?.error_message || error.message,
  });
}

router.get("/neo", async (req, res) => {
  try {
    const { start_date, end_date, asteroid_id } = req.query;
    const params = {};

    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;
    if (asteroid_id) params.asteroid_id = asteroid_id;

    const data = await makeNasaRequest("/neo/rest/v1/feed", params);
    res.json(data);
  } catch (error) {
    handleNasaError(res, error, "Failed to fetch NEO data");
  }
});

module.exports = router;
