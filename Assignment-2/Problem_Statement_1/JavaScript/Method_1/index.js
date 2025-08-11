require("dotenv").config();
const axios = require("axios");
const readline = require("readline");

const API_KEY = process.env.API_KEY;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    console.log(`${city}: ${data.main.temp}°C, ${data.weather[0].description}`);
  } catch (err) {
    console.error(
      "Error fetching weather:",
      err.response?.data?.message || err.message,
    );
  }
}

function askForCity() {
  rl.question('Enter city name (or type "q" to exit): ', async (city) => {
    const input = city.trim().toLowerCase();

    if (input === "quit" || input === "exit" || input === "q") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    if (input === "") {
      console.log("Please enter a valid city name.");
      askForCity();
      return;
    }

    await getWeather(input);
    console.log(""); // Add a blank line for better readability
    askForCity(); // Ask for another city
  });
}

console.log("Weather App - Enter city names to get weather information");
console.log('Type "quit" or "exit" to close the application\n');

askForCity();
