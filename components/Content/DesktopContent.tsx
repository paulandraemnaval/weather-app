"use client";
import React from "react";
import { useGlobalContext } from "@/Context/GlobalProvider";
import DesktopDashboard from "./Dashboard/DesktopDashboard";
import DesktopMap from "./Map/DesktopMap";
import { getBgImage } from "@/Utils/getBgImage";
const DesktopContent = () => {
  const { menu } = useGlobalContext();
  return (
    <div className="h-full flex flex-shrink object-cover">
      {menu === "Dashboard" && <DesktopDashboard />}
      {menu === "Map" && <DesktopMap />}
    </div>
  );
};

export default DesktopContent;
