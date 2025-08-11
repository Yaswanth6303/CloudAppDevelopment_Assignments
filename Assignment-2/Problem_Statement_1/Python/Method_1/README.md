# Weather App - CLI Version

A simple and efficient command-line weather application built with Python and the OpenWeatherMap API.

## Features

- 🌤️ Real-time weather data for any city
- 💻 Clean command-line interface
- ⚡ Fast and lightweight
- 🔒 Secure API key management with environment variables
- 🔄 Interactive loop for multiple city queries
- 📊 Temperature displayed in Celsius

## Setup

### 1. Get an OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure Environment Variables

Create a `.env` file in the project root and add your API key:

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

## Usage

1. Run the application using one of the commands above
2. Enter a city name when prompted
3. View the current weather information including:
   - Weather description
   - Temperature in Celsius
4. Enter another city name or type 'quit'/'exit' to stop

### Example Session

```
Weather App - Enter 'quit' or 'exit' to stop
----------------------------------------
Enter city name (or 'quit' to exit): London
Weather in London: scattered clouds, Temp: 18.5°C
----------------------------------------
Enter city name (or 'quit' to exit): Tokyo
Weather in Tokyo: clear sky, Temp: 22.3°C
----------------------------------------
Enter city name (or 'quit' to exit): quit
Goodbye!
```

## Project Structure

```
Method_1/
├── main.py              # CLI weather application
├── .env                 # Environment variables (API key)
├── pyproject.toml      # Project dependencies
├── uv.lock             # Locked dependency versions
├── .python-version     # Python version specification
└── README.md           # This file
```

## Technologies Used

- **Language**: Python 3.10+
- **HTTP Client**: requests
- **Environment Management**: python-dotenv
- **Package Manager**: uv
- **API**: OpenWeatherMap

## Dependencies

- `requests>=2.32.4` - For making HTTP requests to the weather API
- `python-dotenv>=1.0.0` - For loading environment variables

## Error Handling

The application includes comprehensive error handling for:

- Missing or invalid API keys
- Network connectivity issues
- City not found errors
- Invalid user input
- General application errors

## Security

- API keys are stored securely in environment variables
- `.env` file is excluded from version control
- No sensitive data is exposed in the code

## Exit Commands

You can exit the application using any of these commands:

- `quit`
- `exit`
- `q`

## Requirements

- Python 3.10 or higher
- Internet connection for API calls
- Valid OpenWeatherMap API key
