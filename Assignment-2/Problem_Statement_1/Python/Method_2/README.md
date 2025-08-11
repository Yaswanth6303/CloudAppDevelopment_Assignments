# Weather App

A beautiful and modern weather application built with Flask and the OpenWeatherMap API.

## Features

- 🌤️ Real-time weather data for any city
- 🎨 Beautiful, responsive UI with gradient backgrounds
- 📱 Mobile-friendly design
- ⚡ Fast and lightweight
- 🔒 Secure API key management with environment variables

## Setup

### 1. Get an OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure Environment Variables

Edit the `.env` file and replace `your_api_key_here` with your actual API key:

```bash
OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

This project uses `uv` for dependency management. Install dependencies:

```bash
uv sync
```

## Running the Application

### Using uv (Recommended)

```bash
uv run main.py
```

### Using Python directly

```bash
python main.py
```

The application will be available at `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a city name in the search box
3. Click "Get Weather" to see the current weather conditions
4. The app will display:
   - City name
   - Current temperature in Celsius
   - Weather description
   - Weather icon based on temperature

## Project Structure

```
Method_2/
├── main.py              # Flask application
├── templates/
│   └── index.html      # Beautiful UI template
├── .env                 # Environment variables (API key)
├── pyproject.toml      # Project dependencies
├── uv.lock             # Locked dependency versions
└── README.md           # This file
```

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **API**: OpenWeatherMap
- **Package Manager**: uv
- **Environment Management**: python-dotenv

## Error Handling

The application includes comprehensive error handling for:

- Invalid API keys
- Network connectivity issues
- City not found errors
- General application errors

## Security

- API keys are stored securely in environment variables
- `.env` file is excluded from version control
- No sensitive data is exposed in the code