import { useGlobalContext } from "@/Context/GlobalProvider";

const useTodayTemps = () => {
  const { weatherData } = useGlobalContext();

  const hourlyTemp =
    weatherData?.forecast?.forecastday[0]?.hour?.map((hour) => hour.temp_c) ||
    [];

  const hourlyHeatIndex =
    weatherData?.forecast?.forecastday[0]?.hour?.map(
      (hour) => hour.heatindex_c
    ) || [];

  const hourlyPrecip =
    weatherData?.forecast?.forecastday[0]?.hour?.map(
      (hour) => hour.precip_mm
    ) || [];

  return {
    hourlyTemp,
    hourlyHeatIndex,
    hourlyPrecip,
  };
};

export default useTodayTemps;
