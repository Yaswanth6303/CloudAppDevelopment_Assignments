// Importing required modules
const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Setting up the port. If the PORT variable is not defined in the .env file,
// it will default to 5000.
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies.
// When using JSON bodies in Postman or other API clients,
// this middleware ensures the request body can be accessed properly otherwise it will be undefined.
app.use(express.json());

// Root route for testing.
// When the root URL is accessed, it sends "Hello World" as a response.
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Weather route.
// When this route is hit, it fetches weather data from the OpenWeatherMap API
// based on the city provided in the request body.
app.get("/weather", async (req, res) => {

  // Getting the city from the request body
  const city = req.body.city;

  // If no city is provided, send an error response
  if (!city) return res.status(400).send("City is required");

  try {
    // Getting the API key from the .env file
    const apiKey = process.env.API_KEY;

    // Sending a GET request to the OpenWeatherMap API to fetch weather data
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    // Extracting relevant data from the API response
    const data = response.data;

    // Sending the extracted weather information as a JSON response
    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    // If the API call fails, send an error response
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Starting the server.
// The app listens on the specified port and logs a message when it's running.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
