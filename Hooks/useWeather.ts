"use client";
import { WeatherApiResponse } from "@/Types/WeatherApIResponseType";
import { useEffect, useState } from "react";

const useWeather = () => {
  const [location, setLocation] = useState("Baybay City");
  const [weatherData, setWeatherData] = useState<WeatherApiResponse>();
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const forecast = 7;
      const apiurl = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&days=${forecast}&alerts=yes`;

      const res = await fetch(apiurl);
      const data = await res.json();
      setWeatherData({ ...data });
      console.log("weather data for location:", location, data);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location) return;
    fetchWeather();
  }, [location]);

  return { weatherData, loading, location, setLocation };
};

export default useWeather;
