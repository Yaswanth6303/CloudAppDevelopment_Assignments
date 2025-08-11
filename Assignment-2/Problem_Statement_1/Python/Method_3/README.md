# Weather App - Full Stack (Django + React)

A modern, full-stack weather application built with Django backend and React frontend, featuring real-time weather data, geolocation support, and a beautiful responsive UI.

## Features

- 🌤️ Real-time weather data for any city worldwide
- 📍 Automatic weather detection using device geolocation
- 🎨 Modern, responsive UI built with React and Tailwind CSS
- ⚡ Fast API responses with Django REST endpoints
- 📱 Mobile-friendly design
- 🔒 Secure API key management with environment variables
- 💾 Local storage for remembering last searched city
- 🎯 High-accuracy location detection with fallback options

## Architecture

This application follows a modern full-stack architecture:

- **Backend**: Django with REST API endpoints
- **Frontend**: React with Vite build tool
- **Styling**: Tailwind CSS for modern, responsive design
- **HTTP Client**: Axios for API communication
- **API**: OpenWeatherMap for weather data

## Project Structure

```
Method_3/
├── server/                 # Django backend
│   ├── api/               # API views and endpoints
│   ├── weather_project/   # Django project settings
│   ├── manage.py          # Django management script
│   ├── requirements.txt   # Python dependencies
│   └── pyproject.toml     # Project configuration
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── SearchBar.jsx
│   │   │   └── WeatherCard.jsx
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json       # Node.js dependencies
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.js # Tailwind CSS configuration
└── README.md              # This file
```

## Setup

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn package manager
- OpenWeatherMap API key

### 1. Get an OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Backend Setup (Django)

1. Navigate to the server directory:

   ```bash
   cd Method_3/server
   ```

2. Create and activate a virtual environment (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the server directory:

   ```bash
   OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

5. Run Django migrations (if needed):

   ```bash
   python manage.py migrate
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup (React)

1. Open a new terminal and navigate to the client directory:

   ```bash
   cd Method_3/client
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. The app will automatically attempt to get your current location weather
3. Use the search bar to find weather for any city
4. Click the location button to get weather for your current location
5. View detailed weather information including:
   - Current temperature
   - Weather description
   - Humidity, pressure, and wind speed
   - Sunrise and sunset times

## API Endpoints

The Django backend provides the following REST API endpoints:

### Get Weather by City

- **URL**: `POST http://localhost:8000/weather`
- **Body**: `{ "city": "London" }`
- **Response**: OpenWeatherMap API response with weather data

### Get Weather by Coordinates

- **URL**: `POST http://localhost:8000/weather/coordinates`
- **Body**: `{ "lat": 51.5074, "lon": -0.1278 }`
- **Response**: OpenWeatherMap API response with weather data

## Technologies Used

### Backend

- **Framework**: Django 5.0.7
- **HTTP Client**: requests 2.32.3
- **CORS**: django-cors-headers 4.4.0
- **Environment**: python-dotenv 1.0.1

### Frontend

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.0
- **Styling**: Tailwind CSS 3.4.17
- **HTTP Client**: Axios 1.11.0
- **Development**: ESLint, PostCSS, Autoprefixer

## Features in Detail

### Geolocation Support

- Automatically detects user's location on app load
- High-accuracy location detection with 1km precision requirement
- Graceful fallback to manual city search if location access is denied
- Handles various geolocation errors (timeout, unavailable, denied)

### Search Functionality

- Real-time city search with instant results
- Supports international city names
- Remembers last searched city in local storage
- Input validation and error handling

### Weather Display

- Comprehensive weather information display
- Responsive design that works on all devices
- Clean, modern UI with Tailwind CSS
- Loading states and error handling

## Error Handling

The application includes comprehensive error handling for:

- **Backend**: API key configuration, network issues, invalid requests
- **Frontend**: Geolocation errors, API failures, network connectivity
- **User Experience**: Loading states, error messages, fallback options

## Security

- API keys are stored securely in environment variables
- CORS is properly configured for development
- No sensitive data is exposed in the frontend code
- Input validation on both frontend and backend

## Development

### Backend Development

```bash
cd Method_3/server
python manage.py runserver 0.0.0.0:8000
```

### Frontend Development

```bash
cd Method_3/client
npm run dev
```

### Building for Production

```bash
cd Method_3/client
npm run build
```

## Requirements

- Python 3.10+
- Node.js 18+
- Internet connection for API calls
- Valid OpenWeatherMap API key
- Modern web browser with geolocation support