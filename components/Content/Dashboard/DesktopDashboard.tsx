import React from "react";
import MainDashboard from "@/components/Content/Dashboard/MainDashboard/MainDashboard";
import { useGlobalContext } from "@/Context/GlobalProvider";
const DesktopDashboard = React.memo(() => {
  const { loading, weatherData } = useGlobalContext();
  return (
    <>
      <div className=" gap-2 flex-col flex flex-1 h-full w-full">
        <MainDashboard loading={loading} weatherData={weatherData} />
      </div>
    </>
  );
});

export default DesktopDashboard;
