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

router.get("/mars-photos", async (req, res) => {
  try {
    const { rover, sol, earth_date, camera, page } = req.query;
    const params = {};

    if (rover) params.rover = rover;
    if (sol) params.sol = sol;
    if (earth_date) params.earth_date = earth_date;
    if (camera) params.camera = camera;
    if (page) params.page = page;

    const data = await makeNasaRequest(
      "/mars-photos/api/v1/rovers/curiosity/photos",
      params
    );
    res.json(data);
  } catch (error) {
    handleNasaError(res, error, "Failed to fetch Mars photos");
  }
});

module.exports = router;
