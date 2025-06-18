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
    if (error.response?.data?.error?.code === "OVER_RATE_LIMIT") {
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

// Endpoint to look up a specific NEO,
// maybe can use this to click on a NEO in the feed and check its details?
router.get("/neo/lookup", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Asteroid ID is required" });
    }

    const data = await makeNasaRequest(`/neo/rest/v1/neo/${id}`);
    res.json(data);
  } catch (error) {
    handleNasaError(res, error, "Failed to look up NEO by ID");
  }
});

router.get("/neo/browse", async (req, res) => {
  try {
    const {
      page = 0,
      size = 20,
      is_potentially_hazardous,
      min_diameter,
      max_diameter,
      diameter_unit = "kilometers",
      close_approach_date_min,
      close_approach_date_max,
    } = req.query;

    // Initial request to NASA Browse API
    const data = await makeNasaRequest("/neo/rest/v1/neo/browse", {
      page,
      size,
    });

    // If no filters, return the raw data
    if (
      is_potentially_hazardous === undefined &&
      min_diameter === undefined &&
      max_diameter === undefined &&
      close_approach_date_min === undefined &&
      close_approach_date_max === undefined
    ) {
      return res.json(data);
    }

    // Apply filters on the returned data
    let filteredObjects = data.near_earth_objects;

    // Filter by hazardous status if specified
    if (is_potentially_hazardous !== undefined) {
      const isHazardous = is_potentially_hazardous === "true";
      filteredObjects = filteredObjects.filter(
        (neo) => neo.is_potentially_hazardous_asteroid === isHazardous
      );
    }

    // Filter by diameter if specified
    if (min_diameter !== undefined || max_diameter !== undefined) {
      filteredObjects = filteredObjects.filter((neo) => {
        const minDiameter =
          neo.estimated_diameter[diameter_unit].estimated_diameter_min;
        const maxDiameter =
          neo.estimated_diameter[diameter_unit].estimated_diameter_max;
        const avgDiameter = (minDiameter + maxDiameter) / 2;

        // Check if diameter is within specified range
        return !(
          (min_diameter !== undefined && avgDiameter < Number(min_diameter)) ||
          (max_diameter !== undefined && avgDiameter > Number(max_diameter))
        );
      });
    }

    // Filter by close approach date if specified
    if (
      close_approach_date_min !== undefined ||
      close_approach_date_max !== undefined
    ) {
      filteredObjects = filteredObjects.filter((neo) => {
        // Skip if there are no close approach data
        if (!neo.close_approach_data || neo.close_approach_data.length === 0) {
          return false;
        }

        // Check if any close approach date falls within the range
        return neo.close_approach_data.some((approachData) => {
          const approachDate = new Date(approachData.close_approach_date);

          // Check if date is within the specified range
          return !(
            (close_approach_date_min !== undefined &&
              approachDate < new Date(close_approach_date_min)) ||
            (close_approach_date_max !== undefined &&
              approachDate > new Date(close_approach_date_max))
          );
        });
      });
    }

    const result = {
      ...data,
      near_earth_objects: filteredObjects,
      page: {
        ...data.page,
        total_filtered_elements: filteredObjects.length,
      },
    };

    res.json(result);
  } catch (error) {
    handleNasaError(res, error, "Failed to browse NEO data");
  }
});

module.exports = router;
