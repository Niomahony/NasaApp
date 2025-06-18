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
    console.error("NASA API Error:", error.response?.data || error.message);
    throw error;
  }
};

router.get("/apod", async (req, res) => {
  try {
    const { date, start_date, end_date, count, thumbs } = req.query;
    const params = {};

    if (date) params.date = date;
    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;
    if (count) params.count = count;
    if (thumbs) params.thumbs = thumbs;

    const data = await makeNasaRequest("/planetary/apod", params);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch APOD data",
      message: error.response?.data?.error_message || error.message,
    });
  }
});

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
    res.status(500).json({
      error: "Failed to fetch Mars photos",
      message: error.response?.data?.error_message || error.message,
    });
  }
});

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
    res.status(500).json({
      error: "Failed to fetch NEO data",
      message: error.response?.data?.error_message || error.message,
    });
  }
});

router.get("/epic", async (req, res) => {
  try {
    const { date, available_dates } = req.query;
    const params = {};

    if (date) params.date = date;
    if (available_dates) params.available_dates = available_dates;

    const data = await makeNasaRequest("/EPIC/api/natural/latest", params);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch EPIC data",
      message: error.response?.data?.error_message || error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q, media_type, year_start, year_end, location } = req.query;
    const params = {};

    if (q) params.q = q;
    if (media_type) params.media_type = media_type;
    if (year_start) params.year_start = year_start;
    if (year_end) params.year_end = year_end;
    if (location) params.location = location;

    const data = await makeNasaRequest("/search", params);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to search NASA library",
      message: error.response?.data?.error_message || error.message,
    });
  }
});

module.exports = router;
