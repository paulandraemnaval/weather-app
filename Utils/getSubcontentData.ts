import { WeatherApiResponse } from "@/Types/WeatherApIResponseType";

export const getSubcontentData = (
  weatherData: WeatherApiResponse | undefined
) => {
  const wind = "" + weatherData?.current?.wind_kph || "0";
  const winddir = "" + weatherData?.current?.wind_dir || "";
  const pressure = "" + weatherData?.current?.pressure_mb || "0";
  const rainChance =
    "" + weatherData?.forecast?.forecastday[0]?.day?.daily_chance_of_rain ||
    "0";
  const uvIndex = "" + weatherData?.current?.uv || "0";

  return { wind, winddir, pressure, rainChance, uvIndex };
};
