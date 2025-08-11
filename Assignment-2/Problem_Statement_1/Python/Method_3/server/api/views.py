import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY")


def error_response(status: int, message: str):
    return JsonResponse({"error": message}, status=status)


@csrf_exempt
def weather_by_city(request):
    if request.method != "POST":
        return error_response(405, "Method not allowed")

    try:
        body = json.loads(request.body.decode("utf-8"))
    except Exception:
        return error_response(400, "Invalid JSON body")

    city = body.get("city")
    if not city:
        return error_response(400, "City parameter is required")

    if not OPENWEATHER_API_KEY:
        return error_response(500, "API key not configured")

    url = (
        f"https://api.openweathermap.org/data/2.5/weather?q={city}"
        f"&appid={OPENWEATHER_API_KEY}&units=metric"
    )

    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 404:
            return error_response(404, "City not found")
        resp.raise_for_status()
        return JsonResponse(resp.json())
    except requests.RequestException as exc:
        return error_response(500, f"Failed to fetch weather data")


@csrf_exempt
def weather_by_coordinates(request):
    if request.method != "POST":
        return error_response(405, "Method not allowed")

    try:
        body = json.loads(request.body.decode("utf-8"))
    except Exception:
        return error_response(400, "Invalid JSON body")

    lat = body.get("lat")
    lon = body.get("lon")
    if lat is None or lon is None:
        return error_response(400, "Latitude and longitude parameters are required")

    if not OPENWEATHER_API_KEY:
        return error_response(500, "API key not configured")

    url = (
        f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}"
        f"&appid={OPENWEATHER_API_KEY}&units=metric"
    )

    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        return JsonResponse(resp.json())
    except requests.RequestException:
        return error_response(500, "Failed to fetch weather data for coordinates")
