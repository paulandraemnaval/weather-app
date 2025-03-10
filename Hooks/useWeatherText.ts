"use client";
import { useEffect, useState } from "react";
import { getDateFromApiResponse } from "@/Utils/getDate";
import { WeatherApiResponse } from "@/Types/WeatherApIResponseType";

const useWeatherText = (weatherData: WeatherApiResponse | undefined) => {
  const [weatherText, setWeatherText] = useState({
    location: "Location",
    LastUpdatedDaysAgo: "",
    currentTemp: 0,
    pressure: 0,
    humidity: "0%",
    windSpeed: 0,
    condition: "Condition",
    rainChance: 0,
    uvindex: 0,
  });

  useEffect(() => {
    if (!weatherData) return;
    setWeatherText({
      location: weatherData?.location?.name || "Location",
      LastUpdatedDaysAgo: getDateFromApiResponse(
        weatherData?.current?.last_updated || ""
      ),
      currentTemp: weatherData?.current?.temp_c || 0,
      pressure: weatherData?.current?.pressure_mb || 0,
      humidity: String(weatherData?.current?.humidity).split("%")[0] || "0%",
      windSpeed: weatherData?.current?.wind_kph || 0,
      condition: weatherData?.current?.condition?.text || "Condition",
      rainChance:
        weatherData?.forecast?.forecastday[0]?.day?.daily_chance_of_rain || 0,
      uvindex: weatherData?.current?.uv,
    });
  }, [weatherData]);
  return weatherText;
};

export default useWeatherText;
