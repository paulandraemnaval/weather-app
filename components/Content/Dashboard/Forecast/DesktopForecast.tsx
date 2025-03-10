"use client";
import React from "react";
import { useGlobalContext } from "@/Context/GlobalProvider";
import { getWeekDay } from "@/Utils/getWeekDay";
import { ForecastDay } from "@/Types/ForecastDay";
import { formatShortDate } from "@/Utils/formatShortDate";
import Image from "next/image";

interface ForecastItemProps {
  day: string;
  temp: string;
  icon: string;
}

const DesktopForecast = () => {
  const { weatherData } = useGlobalContext();

  console.log("desktopforecast", weatherData);
  return (
    <div className="flex w-[300px] h-full overflow-y-auto flex-shrink justify-center bg-white/10 backdrop-blur-lg py-4 rounded-md border-white border">
      <div className="flex flex-col gap-[1.25rem] h-fit w-full px-4">
        {weatherData?.forecast?.forecastday?.map((day: ForecastDay) => (
          <ForecastItem
            key={day.date}
            day={day.date}
            temp={"" + day.day.avgtemp_c}
            icon={day.day.condition.icon}
          />
        ))}
      </div>
    </div>
  );
};

const ForecastItem = ({ day, temp, icon }: ForecastItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-md bg-white/10  backdrop-blur-md border border-white/30 text-white shadow-md ">
      <div className="flex flex-col">
        <p className="text-white font-medium">{getWeekDay(day)}</p>
        <p className="text-white text-sm">{formatShortDate(day)}</p>
      </div>
      <p className="text-lg font-bold text-white">{temp}°C</p>
      <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full shadow-md">
        <Image
          src={"https:" + icon}
          alt="Weather Icon"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default DesktopForecast;
