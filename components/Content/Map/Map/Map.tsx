"use client";
import { useEffect, useRef, memo } from "react";
import { useGlobalContext } from "@/Context/GlobalProvider";

declare global {
  interface Window {
    windyInit?: (options: any, callback: (windyAPI: any) => void) => void;
    L?: any;
  }
}

const Map = () => {
  const { weatherData } = useGlobalContext();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!weatherData?.location?.lat || !weatherData?.location?.lon) return;

    const loadWindyScript = () => {
      return new Promise<void>((resolve) => {
        if (
          document.querySelector(
            `script[src="https://api.windy.com/assets/map-forecast/libBoot.js"]`
          )
        ) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://api.windy.com/assets/map-forecast/libBoot.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const loadLeafletScript = () => {
      return new Promise<void>((resolve) => {
        if (window.L) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initWindyMap = async () => {
      await loadWindyScript();
      await loadLeafletScript();

      if (typeof window.windyInit === "function" && mapRef.current) {
        window.windyInit(
          {
            key: "wsEmIidoWJBSEClAItgjMUg293w0pExE",
            lat: weatherData.location.lat,
            lon: weatherData.location.lon,
            zoom: 12,
            verbose: true,
            container: mapRef.current, // Ensure map attaches to div
          },
          (windyAPI) => {
            console.log("Windy API Loaded:", windyAPI);

            const { map, store } = windyAPI;
            store?.set("overlay", "rain");

            const weatherIcon = window.L?.icon({
              iconUrl: `https:${weatherData?.current?.condition?.icon || ""}`,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50],
            });

            const marker = window.L?.marker(
              [weatherData.location.lat, weatherData.location.lon],
              { icon: weatherIcon }
            ).addTo(map);

            marker
              .bindPopup(
                `<b>${weatherData?.location?.name}: ${weatherData.current.temp_c}°C</b><br>Chance of rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`
              )
              .openPopup();
          }
        );
      }
    };

    initWindyMap();
  }, [weatherData]);

  return (
    <div
      ref={mapRef}
      id="windy"
      className="w-full h-full"
      style={{ minHeight: "100%" }}
    />
  );
};

export default Map;
