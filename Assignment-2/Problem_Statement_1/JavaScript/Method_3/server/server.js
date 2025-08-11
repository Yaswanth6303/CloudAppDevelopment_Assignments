const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.API_KEY;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/weather", async (req, res) => {
  const city = req.body.city;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: "City not found" });
    } else {
      console.error("Weather API error:", error.message);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

app.post("/weather/coordinates", async (req, res) => {
  const { lat, lon } = req.body;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude parameters are required" });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const { data } = await axios.get(url);

    res.json(data);
  } catch (error) {
    console.error("Weather API error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch weather data for coordinates" });
  }
});

app.listen(3000, () => console.log("API running on port 3000"));
