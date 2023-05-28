import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import './App.css';

function WeatherDetails({ weather }) {
  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <div className="shadow rounded wetherResultBox mt-3 ">
        <img
                className="weathorIcon"
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              />
        <h2>Weather Details</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>

  );
}

function App() {
  const apiKey = "apiKey";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    setLoading(true);
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <p>Loading...</p>
        </div>
      ) : Object.keys(data).length > 0 ? (
        <div className="row">
          <div className="col-md-6 text-center mt-5">
            <div className="shadow rounded wetherResultBox">
              <img
                className="weathorIcon"
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              />
              <h5 className="weathorCity">{data?.name}</h5>
              <h6 className="weathorTemp">
                {((data?.main?.temp) - 273.15).toFixed(2)}°C
              </h6>
            </div>
          </div>
          <div className="col-md-6 text-center pt-3">
            <WeatherDetails weather={data} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
