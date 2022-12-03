import React, { useState } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7e5a8d7e7cd90a3085e74fcc13ef0d59`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div> {data.sys ? <p>{data.sys.country}</p> : null}</div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed() - 273}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
            <div className="bold">
              {data.main ? <p>{data.main.feels_like.toFixed() - 273}°C</p> : null}
            </div>
            <p>Feels like</p>
          </div>
          <div className="humidity">
            <div className="bold">
              {data.main ? <p>{data.main.humidity}%</p> : null}
            </div>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <div className="bold">
              {" "}
              {data.main ? <p>{data.wind.speed.toFixed()} KPH</p> : null}
            </div>
            <p>Wind speed</p>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default App;
