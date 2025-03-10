import { useGlobalContext } from "@/Context/GlobalProvider";

const useTodayTemps = () => {
  const { weatherData } = useGlobalContext();

  const hourlyTemp =
    weatherData?.forecast?.forecastday[0]?.hour?.map(
      (hour: any) => hour.temp_c
    ) || [];

  const hourlyHeatIndex =
    weatherData?.forecast?.forecastday[0]?.hour?.map(
      (hour: any) => hour.heatindex_c
    ) || [];

  const hourlyPrecip =
    weatherData?.forecast?.forecastday[0]?.hour?.map(
      (hour: any) => hour.precip_mm
    ) || [];

  return {
    hourlyTemp,
    hourlyHeatIndex,
    hourlyPrecip,
  };
};

export default useTodayTemps;
