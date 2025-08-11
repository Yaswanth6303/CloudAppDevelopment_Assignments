from flask import Flask, render_template, request
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
API_KEY = os.getenv('OPENWEATHER_API_KEY')

@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    error = None
    
    if request.method == 'POST':
        city = request.form['city']
        if not API_KEY or API_KEY == 'your_api_key_here':
            error = "Please set your OpenWeatherMap API key in the .env file"
        else:
            try:
                url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                data = response.json()
                
                if data.get('main'):
                    weather = {
                        'city': city,
                        'temp': round(data['main']['temp'], 1),
                        'description': data['weather'][0]['description']
                    }
                else:
                    error = f"City '{city}' not found. Please check the spelling."
            except requests.exceptions.RequestException as e:
                error = "Network error. Please check your internet connection."
            except Exception as e:
                error = "An error occurred. Please try again."
    
    return render_template('index.html', weather=weather, error=error)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)