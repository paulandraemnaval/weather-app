import { WeatherApiResponse } from "../Types/WeatherApIResponseType";

export const getNextNHoursForecast = (
  weatherData: WeatherApiResponse,
  n: number
) => {
  if (!weatherData?.forecast?.forecastday) return [];

  const nowEpoch = Math.floor(Date.now() / 1000);

  const allHours = weatherData.forecast.forecastday.flatMap((day) => day.hour);

  const currentHour = allHours.reduce(
    (prev, curr) =>
      curr.time_epoch <= nowEpoch && curr.time_epoch > prev.time_epoch
        ? curr
        : prev,
    allHours[0]
  );

  const nextHours = allHours
    .filter((hour) => hour.time_epoch >= currentHour.time_epoch)
    .slice(0, n);

  return nextHours;
};
