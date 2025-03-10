"use client";
import React from "react";
import { useGlobalContext } from "@/Context/GlobalProvider";
import { getNextNHoursForecast } from "@/Utils/getNextFourHours";
import Image from "next/image";

const convertTo12Hour = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}${suffix}`;
};

const MobileForecast = () => {
  const { weatherData } = useGlobalContext();
  const nextFourHours = getNextNHoursForecast(weatherData, 6);

  return (
    <div className="flex lg:hidden flex-col w-full item-center justify-center py-4 overflow-x-auto">
      <div className="w-full flex justify-evenly gap-2">
        {nextFourHours.length == 6
          ? nextFourHours.map((hour, index) => (
              <MobileForecastItem data={hour} key={index} />
            ))
          : null}
      </div>
    </div>
  );
};

export default MobileForecast;

const MobileForecastItem = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md w-full">
      {data ? (
        <>
          <p className="text-lg font-semibold ">
            {convertTo12Hour(data?.time.split(" ")[1])}
          </p>
          {data?.condition?.icon && (
            <Image
              src={`https:${data?.condition?.icon}`}
              height={40}
              width={40}
              alt="weather icon"
            />
          )}
          <p className="text-xs">{Math.floor(data?.temp_c)}°C</p>
        </>
      ) : null}
    </div>
  );
};
