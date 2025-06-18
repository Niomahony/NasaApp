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

router.get("/epic", async (req, res) => {
  try {
    const { date, available_dates } = req.query;
    const params = {};

    if (date) params.date = date;
    if (available_dates) params.available_dates = available_dates;

    const data = await makeNasaRequest("/EPIC/api/natural/latest", params);
    res.json(data);
  } catch (error) {
    handleNasaError(res, error, "Failed to fetch EPIC data");
  }
});

module.exports = router;
