import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_BASE = "http://localhost:8000";

export default function App() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(() => localStorage.getItem("lastCity") || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      getCurrentLocationWeather();
    } else {
      fetchWeather(city);
    }
  }, [city]);

  async function getCurrentLocationWeather() {
    setLoading(true);
    setError(null);
    setData(null);

    setCity("");
    localStorage.removeItem("lastCity");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 15000,
          enableHighAccuracy: true,
          maximumAge: 0,
        });
      });

      const { latitude, longitude, accuracy } = position.coords;
      if (accuracy > 1000) {
        setError("Location accuracy is too low. Please search for a city manually.");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE}/weather/coordinates`, {
        lat: latitude,
        lon: longitude,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      setData(response.data);
    } catch (error) {
      if (error.code === 1) {
        setError("Location access denied. Please search for a city manually.");
      } else if (error.code === 2) {
        setError("Location unavailable. Please search for a city manually.");
      } else if (error.code === 3) {
        setError("Location request timed out. Please search for a city manually.");
      } else {
        setError(error.response?.data?.error || error.message || "Failed to get current location weather");
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeather(q) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(`${API_BASE}/weather`, { city: q }, {
        headers: { "Content-Type": "application/json" }
      });

      setData(response.data);
      localStorage.setItem("lastCity", q);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("City not found");
      } else {
        setError(error.response?.data?.error || error.message || "Failed to fetch weather");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    const q = query.trim();
    if (!q) return;
    setCity(q);
    setQuery("");
  }

  return (
    <div className="min-h-screen p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold mb-2">Weather</h1>
          <p className="text-sm text-slate-500">Search current weather by city — powered by OpenWeatherMap</p>
        </header>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          onCurrentLocation={getCurrentLocationWeather}
        />

        <div className="mt-6">
          {loading && (
            <div className="p-6 bg-white rounded-2xl shadow text-center">Loading…</div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
          )}

          {!loading && !error && data && <WeatherCard data={data} />}
        </div>

        <footer className="mt-6 text-xs text-slate-400">
          Tip: Use city names like "London" or "Mumbai,IN" for best results.
        </footer>
      </div>
    </div>
  );
}
