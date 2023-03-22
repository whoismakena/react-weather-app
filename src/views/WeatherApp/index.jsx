import moment from "moment";
import React, { useEffect, useState } from "react";
import Element from "../../components/Element";
import URLS from "../../configurations/urls";
import { weatherConditions } from "../../configurations/weatherConditons";
import useFetchData from "../../hooks/useFetchData";
import "../../styles/App.css";

export default function WeatherApp() {
  const [location, setLocation] = useState("Nairobi");
  const [locationInfo, setLocationInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [astronomyInfo, setAstronomyInfo] = useState(null);

  const { status, data, error } = useFetchData(
    "weather",
    URLS.CURRENT_WEATHER,
    location
  );

  const {
    status: status2,
    data: data2,
    error: error2,
  } = useFetchData("astronomy", URLS.ASTRONOMY, location);

  const localtime =
    locationInfo && locationInfo.localtime
      ? moment(locationInfo.localtime).format("HH")
      : locationInfo && moment().format("HH");

  const timeOfDay = localtime >= 19 || localtime < 6 ? "night" : "day";

  const astronomy = (time) => {
    if (time === "night") {
      return (
        <Element
          image={require("../../assets/sunrise.png")}
          altText={"Sunrise"}
          value={
            astronomyInfo && astronomyInfo.astro
              ? astronomyInfo.astro.sunrise
              : ""
          }
        />
      );
    } else {
      return (
        <Element
          image={require("../../assets/sunset.png")}
          altText={"Sunset"}
          value={
            astronomyInfo && astronomyInfo.astro
              ? astronomyInfo.astro.sunset
              : ""
          }
        />
      );
    }
  };

  const handleBackground = (time, status) => {
    const iconKey = time === "night" ? "iconNight" : "iconDay";
    let image = require("../../assets/clear-sky.jpeg");

    for (const condition of weatherConditions) {
      if (condition[time] === status) {
        image = condition[iconKey];
      }
    }
    return image;
  };

  const handleWeatherQuery = () => {
    switch (status) {
      case "success":
        setLocationInfo(data.location);
        setWeatherInfo(data.current);
        break;
      case "error":
        console.log("error:", error);
        break;
      default:
        break;
    }
  };

  const handleAstronomyQuery = () => {
    switch (status2) {
      case "success":
        setAstronomyInfo(data2.astronomy);
        break;
      case "error":
        console.log("error:", error2);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleWeatherQuery();
  }, [status]);

  useEffect(() => {
    handleAstronomyQuery();
  }, [status2]);

  return (
    <div
      className="Weather-App-Container"
      style={{
        backgroundImage: `url(${handleBackground(
          timeOfDay,
          weatherInfo && weatherInfo.condition
            ? weatherInfo.condition.text
            : "Partly cloudy"
        )})`,
      }}
    >
      <div className="SearchContainer">
        <input
          value={location}
          placeholder="Enter a city"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="Weather-App-Content">
        <div className="LocationInfo">
          <div className="LocationInfoDiv">
            <span className="Location">
              {locationInfo && locationInfo.name ? locationInfo.name : null}
            </span>
            <span className="Time">
              {locationInfo && locationInfo.localtime
                ? moment.utc(locationInfo.localtime).format("ddd, HH:mm ")
                : null}
            </span>
          </div>
          <div className="Astronomy">{astronomy(timeOfDay)}</div>
        </div>
        <div className="WeatherVisuals Flex-Center">
          {weatherInfo && weatherInfo.condition ? (
            <img src={`https:${weatherInfo.condition.icon}`} alt="icon" />
          ) : null}
          <span>
            {weatherInfo && weatherInfo.condition
              ? weatherInfo.condition.text
              : null}
          </span>
        </div>
        <div className="WeatherInfo">
          <div className="Temperature">
            <span>
              {weatherInfo && weatherInfo.temp_c
                ? weatherInfo.temp_c + "°"
                : null}
            </span>
          </div>
          <div className="AdditionalInfo">
            <Element
              image={require("../../assets/humidity.png")}
              altText={"Humidity"}
              value={
                weatherInfo && weatherInfo.humidity
                  ? weatherInfo.humidity + "%"
                  : ""
              }
            />
            <Element
              image={require("../../assets/wind.png")}
              altText={"Wind"}
              value={
                weatherInfo && weatherInfo.wind_kph ? weatherInfo.wind_kph : ""
              }
            />
            <Element
              image={require("../../assets/uv.png")}
              altText={"UV"}
              value={weatherInfo && weatherInfo.uv ? weatherInfo.uv : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
