# Weather App

A React weather application that fetches weather data from OpenWeatherMap API through a Node.js backend server.

## Setup Instructions

### 1. Server Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with your OpenWeatherMap API key:

   ```
   API_KEY=your_openweathermap_api_key_here
   ```

   Get your API key from: https://openweathermap.org/api

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will run on http://localhost:3000

### 2. Client Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The client will run on http://localhost:5173

## How it Works

- The frontend (React) makes POST requests to the backend server
- The backend server fetches weather data from OpenWeatherMap API
- The server returns the complete weather data to the frontend
- The frontend displays the weather information in a beautiful UI

## Features

- Search weather by city name
- Displays temperature, humidity, wind speed, and pressure
- Shows weather description and icons
- Responsive design with Tailwind CSS
- Error handling for invalid cities and API issues
- Local storage for remembering the last searched city

## API Endpoints

- `POST /weather` - Get weather data for a city
  - Body: `{ "city": "London" }`
  - Returns: Complete OpenWeatherMap API response
