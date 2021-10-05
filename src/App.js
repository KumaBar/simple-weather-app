import React, { useState } from "react";

const api = {
  key: "dd49427c2ef1bb02bd7385212a0e9dfa",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  //data
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  //mutations

  const onSearch = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setWeather(result)
          setQuery("");
        });
    }
  };
  const date = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <div className="main">
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={onSearch}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location">
              <div className="location-text">
                {weather.name} {weather.sys.country}
              </div>
              <div className="location-date">{date(new Date())}</div>
            </div>
            <div className="weather">
              <div className="weather-temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-text">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
