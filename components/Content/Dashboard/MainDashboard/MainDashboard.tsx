"use client";
import { useState } from "react";
import Image from "next/image";
import useWeatherText from "@/Hooks/useWeatherText";
import useTodayTemps from "@/Hooks/useTodayTemps";
import LineChartComponent from "@/components/Content/Dashboard/Linechart/Linechart";
import { WeatherApiResponse } from "@/Types/WeatherApIResponseType";
import icons from "@/constants/icons";
import { getBgImage } from "@/Utils/getBgImage";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Circle, CircleAlert, Scroll } from "lucide-react";
import DesktopForecast from "../Forecast/DesktopForecast";
import CircularGauge from "@/components/Gauge/Gauge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DesktopDashboardHeader from "../DashboardHeader/DesktopDashboardHeader";
import { useGlobalContext } from "@/Context/GlobalProvider";
import MobileForecast from "../Forecast/MobileForecast";
import { Switch } from "@/components/ui/switch";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
const metricOptions = [
  { value: "temp", label: "🌡️ Temperature (°C)" },
  { value: "heatIndex", label: "🔥 Heat Index (°C)" },
  { value: "precip", label: "🌧️ Precipitation (mm)" },
];
import WeatherAlert from "@/components/Content/Dashboard/Alert/Alert";
import MobileAlert from "../Alert/MobileAlert";
import { Toggle } from "@/components/ui/toggle";
const MainDashboard = ({
  loading,
  weatherData,
}: {
  loading: boolean;
  weatherData: WeatherApiResponse;
}) => {
  const {
    location,
    currentTemp,
    humidity,
    windSpeed,
    condition,
    rainChance,
    uvindex,
  } = useWeatherText(weatherData as unknown as WeatherApiResponse);

  const bgimg = getBgImage(condition);
  const { hourlyTemp, hourlyHeatIndex, hourlyPrecip } = useTodayTemps();
  const { setLocation } = useGlobalContext();
  const [selectedMetric, setSelectedMetric] = useState("temp");
  const [unit, setUnit] = useState("°C");
  const [currLocation, setCurrLocation] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);
  const handleSelectMetric = (value: string) => {
    setSelectedMetric(value);
    setUnit(value === "temp" || value === "heatIndex" ? "°C" : "mm");
  };

  const handleLocationChange = () => {
    setLocation(currLocation);
    setIsDialogOpen(false);
  };

  const handleThemeToggle = () => {
    setToggle((prev) => !prev);
  };

  const data = hourlyTemp?.map((_: number, index: number) => ({
    hour: `${index}:00`,
    value:
      selectedMetric === "temp"
        ? hourlyTemp[index]
        : selectedMetric === "heatIndex"
        ? hourlyHeatIndex[index]
        : hourlyPrecip[index],
  }));

  const handleShowAlerts = () => {
    setShowAlerts((prev) => !prev);
  };

  return (
    <div
      className={`w-full h-full flex lg:flex-row flex-col lg:p-4 text-white lg:gap-0 gap-2 bg-cover bg-center brightness-90 px-4 py-12 transition-all duration-500 relative
    before:content-[''] before:absolute before:inset-0 before:transition-all before:duration-500 before:pointer-events-none
    ${
      !toggle
        ? "before:bg-black/60 before:backdrop-blur-md"
        : "before:bg-transparent/30 before:backdrop-blur-[1px]"
    }
  `}
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="flex flex-1 rounded-md flex-start flex-col px-6 bg-transparent z-10">
        y<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-2 h-fit">
              <Image
                src={icons.location}
                alt="Location"
                width={30}
                height={30}
              />
              <DialogTrigger
                asChild
                className="backdrop-blur-md bg-white/20 px-2 py-1 rounded-md hover:bg-white/30 transition-all duration-100 ease-in-out hover:shadow-md shadow-none w-fit cursor-pointer ml-4 mr-auto"
              >
                <p className="ml-2 font-semibold text-2xl w-fit">{location}</p>
              </DialogTrigger>
              <div className="flex items-center justify-center gap-2 h-fit">
                <Switch
                  id="theme-switch"
                  onCheckedChange={handleThemeToggle}
                  className="h-fit"
                />
              </div>
            </div>
            <WeatherAlert alerts={weatherData?.alerts?.alert} />
            <MobileAlert alerts={weatherData?.alerts?.alert} />
          </div>

          <DialogContent className="p-6 bg-white/20 backdrop-blur-md border-white border ">
            <DialogHeader>
              <DialogTitle className="text-white">Enter Location</DialogTitle>
            </DialogHeader>
            <DesktopDashboardHeader
              location={currLocation}
              setLocation={setCurrLocation}
            />
            <DialogFooter className="mt-4 gap-2 flex flex-row">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="ml-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLocationChange}
                disabled={!currLocation ? true : false}
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex lg:flex-row flex-col w-full h-[60%]  items-center">
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-[4rem] font-poppins font-semibold shadow-sm">
              {currentTemp}°C
            </p>
            <p className="text-xl font-light shadow-sm">{condition}</p>
          </div>
          <div className="flex lg:flex-col flex-row lg:justify-normal lg:w-fit w-[70%] gap-2  lg:h-full h-fit justify-center">
            <CircularGauge
              value={rainChance}
              max={110}
              color="#3498db"
              icon={icons.rain}
              tooltipInfo={{
                label: "Rain Chance",
                description: (val) =>
                  val > 80
                    ? "Very high chance of rain. Bring your umbrella!"
                    : val > 50
                    ? "Moderate chance of rain. Be prepared, bring your umbrella!"
                    : "Low chance of rain. You can leave your umbrella at home.",
              }}
              title="Rain Chance"
            />
            <CircularGauge
              value={Number(humidity)}
              max={110}
              color="#e74c3c"
              icon={icons.humidity}
              tooltipInfo={{
                label: "Humidity",
                description: (value) =>
                  value > 80
                    ? "Very humid, expect a sticky and warm day."
                    : value > 50
                    ? "Moderate humidity, fairly comfortable."
                    : "Low humidity, air feels dry.",
              }}
              title="Humidity"
            />
            <CircularGauge
              value={windSpeed}
              max={50}
              color="#f39c12"
              icon={icons.wind}
              tooltipInfo={{
                label: "Wind Speed",
                description: (value) =>
                  value > 30
                    ? "Strong winds, be cautious."
                    : value > 20
                    ? "Moderate winds, hold onto your hat."
                    : "Gentle breeze, perfect weather for a walk.",
              }}
              title="Wind Speed"
            />
            <CircularGauge
              value={uvindex}
              max={10}
              color="#f39c12"
              icon={icons.sun}
              tooltipInfo={{
                label: "UV Index",
                description: (value) =>
                  value > 8
                    ? "Extreme UV levels, stay out of the sun!"
                    : value > 5
                    ? "High UV levels, wear sunscreen."
                    : "Low UV levels, no need for sunscreen.",
              }}
              title="UV Index"
            />
          </div>
        </div>
        <div className="lg:hidden flex">
          <MobileForecast />
        </div>
        <div className="flex sm:h-[40%] h-[28%] border rounded-md py-4 px-2 flex-col bg-white/10 backdrop-blur-lg shadow-md ">
          <div className="flex items-center justify-between mb-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-[15rem] flex justify-between items-center bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md transition-all hover:bg-white/30">
                  {metricOptions.find((m) => m.value === selectedMetric)?.label}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-md shadow-lg"
              >
                {metricOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => handleSelectMetric(option.value)}
                    className="cursor-pointer px-4 py-2 transition-all hover:bg-indigo-500 hover:text-white"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <LineChartComponent data={data} unit={unit} />
        </div>
      </div>
      <div className="lg:flex hidden">
        <DesktopForecast />
      </div>
    </div>
  );
};

export default MainDashboard;
