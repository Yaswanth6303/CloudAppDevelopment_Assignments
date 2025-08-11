import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('OPENWEATHER_API_KEY')

if not API_KEY or API_KEY == 'your_api_key_here':
    print("Error: Please set your OpenWeatherMap API key in the .env file")
    print("Replace 'your_api_key_here' with your actual API key")
    exit(1)

print("Weather App - Enter 'quit' or 'exit' to stop")
print("-" * 40)

while True:
    city = input("Enter city name (or 'quit' to exit): ")
    
    if city.lower() in ['quit', 'exit', 'q']:
        print("Goodbye!")
        break
    
    if not city:
        print("Please enter a valid city name.")
        continue
    
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code == 200:
            print(f"Weather in {city}: {data['weather'][0]['description']}, Temp: {data['main']['temp']}°C")
        else:
            print(f"City '{city}' not found. Please try again.")
    except requests.RequestException as e:
        print(f"Error connecting to weather service: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")
    
    print("-" * 40)
