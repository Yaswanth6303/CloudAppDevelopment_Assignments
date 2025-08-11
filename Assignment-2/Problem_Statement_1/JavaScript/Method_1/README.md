# Weather App - Method 1

A simple command-line weather application built with Node.js that allows users to get real-time weather information for any city using the OpenWeatherMap API.

## Features

- 🌍 Get current weather data for any city worldwide
- 🌡️ Temperature displayed in Celsius
- ☁️ Weather description (e.g., "clear sky", "rain", "cloudy")
- 🔄 Interactive command-line interface
- 🚪 Easy exit functionality
- ⚡ Real-time API integration

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14 or higher) installed on your system
- An **OpenWeatherMap API key** (free account available at [OpenWeatherMap](https://openweathermap.org/api))

## Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd Method_1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the project root
   - Add your OpenWeatherMap API key:
     ```
     API_KEY=your_api_key_here
     ```

## Usage

### Starting the Application

Run the application using one of the following commands:

```bash

# Using node directly
node index.js

# Using nodemon for development (auto-restart on file changes)
npm run dev
```

### Using the Application

1. **Launch the app** - The application will start and prompt you to enter a city name
2. **Enter city name** - Type the name of any city (e.g., "London", "New York", "Tokyo")
3. **View weather data** - The app will display:
   - City name
   - Current temperature in Celsius
   - Weather description
4. **Continue or exit** - Enter another city name or type "quit"/"exit" to close the application

### Example Usage

```
Weather App - Enter city names to get weather information
Type "quit" or "exit" to close the application

Enter city name (or type "quit" to exit): London
London: 18.5°C, scattered clouds

Enter city name (or type "quit" to exit): Tokyo
Tokyo: 22.1°C, clear sky

Enter city name (or type "quit" to exit): quit
Goodbye!
```

## Project Structure

```
Method_1/
├── index.js          # Main application file
├── package.json      # Project dependencies and scripts
├── package-lock.json # Dependency lock file
└── README.md         # This file
```

## Dependencies

- **axios**: HTTP client for making API requests
- **dotenv**: Environment variable management
- **readline**: Command-line interface functionality
- **nodemon**: Development dependency for auto-restarting the application

## API Integration

This application uses the **OpenWeatherMap API** to fetch weather data:

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**:
  - `q`: City name
  - `appid`: API key
  - `units`: metric (for Celsius temperature)

## Error Handling

The application includes robust error handling for:

- Invalid city names
- Network connectivity issues
- API rate limiting
- Invalid API keys

## Development

### Available Scripts

- `node index.js`: Run the application
- `npm run dev`: Run with nodemon for development

### Adding Features

To extend the application, you can:

- Add more weather data fields (humidity, wind speed, etc.)
- Implement weather forecasting
- Add location-based weather detection
- Create a graphical user interface

## Troubleshooting

### Common Issues

1. **"Error fetching weather"**

   - Check your API key in the `.env` file
   - Verify internet connectivity
   - Ensure the city name is spelled correctly

2. **"Module not found" errors**

   - Run `npm install` to install dependencies
   - Check if Node.js is properly installed

3. **API key issues**
   - Verify your OpenWeatherMap API key is valid
   - Check if you've exceeded the free tier limits