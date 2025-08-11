export default function WeatherCard({ data }) {
  if (!data) return null;

  const iconUrl = data.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {data.name}, {data.sys?.country}
          </h2>
          <p className="text-sm text-slate-500">
            {data.weather?.[0]?.description}
          </p>
        </div>
        {iconUrl && (
          <img
            src={iconUrl}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-5xl font-bold">
            {Math.round(data.main.temp)}°C
          </div>
          <div className="text-sm text-slate-500">
            Feels like {Math.round(data.main.feels_like)}°C
          </div>
        </div>

        <div className="text-sm text-slate-600">
          <div>Humidity: {data.main.humidity}%</div>
          <div>Wind: {Math.round(data.wind.speed)} m/s</div>
          <div>Pressure: {data.main.pressure} hPa</div>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-400">
        Data from OpenWeatherMap
      </div>
    </div>
  );
}
