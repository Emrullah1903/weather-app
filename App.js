import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const fetchWeather = async () => {
    setLoading(true); 
    setError(""); 
    setWeather(null); 

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            units: "metric", 
            appid: process.env.REACT_APP_WEATHER_API_KEY,
        }
      );
      setWeather(response.data); 
    } catch (err) {
      setError("Şehir bulunamadı! Lütfen geçerli bir şehir adı girin.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Şehir adı girin..."
          value={city}
          onChange={(e) => setCity(e.target.value)} 
        />
        <button onClick={fetchWeather}>Ara</button>
      </div>

      {/* Yükleniyor mesajı */}
      {loading && <p>Yükleniyor...</p>}

      {/* Hata mesajı */}
      {error && <p className="error">{error}</p>}

      {/* Hava durumu bilgileri */}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Hava: {weather.weather[0].description}</p>
          <p>Rüzgar Hızı: {weather.wind.speed} m/s</p>
          <p>Nem: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
